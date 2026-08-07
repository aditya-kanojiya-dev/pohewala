import "server-only";
import { Pool } from "pg";

// ponytail: single shared pool, max 1 connection so serverless instances
// don't exhaust the database's connection limit. Pool size can be raised
// if traffic grows and the DB plan allows more connections.
const globalForDb = globalThis as unknown as { __pohewalaPool?: Pool };

function createPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Add it to your environment (see .env.example).");
  }
  const isLocal = /localhost|127\.0\.0\.1/.test(connectionString);
  return new Pool({
    connectionString,
    max: 1,
    // Managed hosts (Neon, Supabase) refuse plaintext connections; pg ignores
    // sslmode in the URL, so force SSL here. Local Postgres usually has none.
    ssl: isLocal ? false : { rejectUnauthorized: false },
  });
}

// Lazy: the pool is only created on first use, so builds and the unauthenticated
// admin login page work fine without DATABASE_URL configured.
export function getPool(): Pool {
  globalForDb.__pohewalaPool ??= createPool();
  return globalForDb.__pohewalaPool;
}

const CREATE_LEADS_TABLE = `
  CREATE TABLE IF NOT EXISTS leads (
    id BIGSERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT,
    subject TEXT,
    message TEXT,
    extra TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

const CREATE_LOGIN_ATTEMPTS_TABLE = `
  CREATE TABLE IF NOT EXISTS login_attempts (
    ip TEXT PRIMARY KEY,
    fails INTEGER NOT NULL DEFAULT 1,
    blocked_until TIMESTAMPTZ
  )
`;

let ensured = false;

// ponytail: create the tables lazily on first use instead of a migration
// step — idempotent, zero setup. Fine until schema changes are frequent.
export async function ensureTables(): Promise<void> {
  if (ensured) return;
  await getPool().query(CREATE_LEADS_TABLE);
  await getPool().query(CREATE_LOGIN_ATTEMPTS_TABLE);
  ensured = true;
}
