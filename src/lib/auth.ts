import "server-only";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { ensureTables, getPool } from "./db.ts";

export const SESSION_COOKIE = "pohewala_admin";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_LOCKOUT_MS = 15 * 60 * 1000;

// ponytail: stateless signed cookie (no session table). AUTH_SECRET signs
// the token; falls back to ADMIN_PASSWORD so one secret is enough.
// Sessions are invalid on secret rotation — acceptable for a single admin.
function secret(): string {
  return process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD || "";
}

function hmac(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function signSession(): string {
  const exp = Date.now() + SESSION_TTL_MS;
  const nonce = randomBytes(16).toString("hex");
  const payload = `${exp}.${nonce}`;
  return `${payload}.${hmac(payload)}`;
}

export function verifySession(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [exp, nonce, sig] = parts;
  if (!exp || !nonce || !sig) return false;
  const expMs = Number(exp);
  if (Number.isNaN(expMs) || expMs < Date.now()) return false;
  const expected = hmac(`${exp}.${nonce}`);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Reject cross-site POSTs (CSRF) by matching Origin against Host, the same
// check Next.js applies to Server Actions. Returns true when the request is
// same-origin or carries no Origin header (same as Server Actions' behavior).
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

// Login throttle keyed by IP in Postgres so it holds across serverless
// instances. The SQL only counts attempts that are not currently blocked;
// a passed block is lifted on next attempt.
export async function loginAllowed(ip: string): Promise<boolean> {
  try {
    await ensureTables();
    const { rows } = await getPool().query<{ blocked_until: string | null }>(
      "SELECT blocked_until FROM login_attempts WHERE ip = $1",
      [ip]
    );
    const blockedUntil = rows[0]?.blocked_until;
    if (!blockedUntil) return true;
    if (new Date(blockedUntil).getTime() > Date.now()) return false;
    await getPool().query("DELETE FROM login_attempts WHERE ip = $1", [ip]);
    return true;
  } catch {
    // ponytail: fail open — a limiter outage must never brick the login.
    return true;
  }
}

export async function recordFailedLogin(ip: string): Promise<void> {
  try {
    await ensureTables();
    await getPool().query(
      `INSERT INTO login_attempts (ip) VALUES ($1)
       ON CONFLICT (ip) DO UPDATE SET fails = login_attempts.fails + 1
       WHERE login_attempts.blocked_until IS NULL OR login_attempts.blocked_until < now()`,
      [ip]
    );
    await getPool().query(
      `UPDATE login_attempts
       SET blocked_until = now() + $2::interval, fails = 1
       WHERE ip = $1 AND fails >= $3`,
      [ip, `${LOGIN_LOCKOUT_MS} milliseconds`, LOGIN_MAX_ATTEMPTS]
    );
  } catch {
    // fail open (see loginAllowed)
  }
}

export async function recordSuccessfulLogin(ip: string): Promise<void> {
  try {
    await getPool().query("DELETE FROM login_attempts WHERE ip = $1", [ip]);
  } catch {
    // fail open (see loginAllowed)
  }
}
