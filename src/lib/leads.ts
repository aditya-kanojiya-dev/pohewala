import "server-only";
import { ensureTables, getPool } from "./db";

export type LeadType = "contact" | "franchise" | "enquiry";

export interface LeadInput {
  type: LeadType;
  name: string;
  email: string;
  phone: string;
  city?: string;
  subject?: string;
  message?: string;
  extra?: string;
}

export interface Lead extends LeadInput {
  id: number;
  created_at: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLead(input: unknown): LeadInput | string {
  if (!input || typeof input !== "object") return "Invalid request body.";
  const body = input as Record<string, unknown>;

  if (body.honeypot && String(body.honeypot).trim() !== "") {
    return "Invalid request body.";
  }

  const type = String(body.type ?? "");
  if (type !== "contact" && type !== "franchise" && type !== "enquiry") {
    return "Invalid enquiry type.";
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const name = str(body.name);
  const email = str(body.email).toLowerCase();
  const phone = str(body.phone);
  const city = str(body.city).slice(0, 120) || undefined;
  const subject = str(body.subject).slice(0, 200) || undefined;
  const message = str(body.message).slice(0, 5000) || undefined;
  const extra = str(body.extra).slice(0, 200) || undefined;

  if (!name || name.length > 120) return "Please provide a valid name.";
  if (!EMAIL_RE.test(email) || email.length > 254) return "Please provide a valid email address.";
  if (!phone || phone.length > 20) return "Please provide a valid phone number.";

  return { type, name, email, phone, city, subject, message, extra };
}

export async function createLead(input: LeadInput): Promise<Lead> {
  await ensureTables();
  const { rows } = await getPool().query<Lead>(
    `INSERT INTO leads (type, name, email, phone, city, subject, message, extra)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, type, name, email, phone, city, subject, message, extra, created_at`,
    [input.type, input.name, input.email, input.phone, input.city ?? null, input.subject ?? null, input.message ?? null, input.extra ?? null]
  );
  return rows[0];
}

export async function listLeads(limit = 100): Promise<Lead[]> {
  await ensureTables();
  const { rows } = await getPool().query<Lead>(
    `SELECT id, type, name, email, phone, city, subject, message, extra, created_at
     FROM leads ORDER BY created_at DESC LIMIT $1`,
    [limit]
  );
  return rows;
}
