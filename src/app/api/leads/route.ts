import { createLead, validateLead } from "@/lib/leads";
import { notifyWhatsApp } from "@/lib/notify";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = validateLead(body);
  if (typeof result === "string") {
    return Response.json({ error: result }, { status: 400 });
  }

  try {
    const lead = await createLead(result);
    // ponytail: notify after save, never block or fail the response on it.
    notifyWhatsApp(result).catch((err) =>
      console.error("WhatsApp notify threw:", err)
    );
    return Response.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("Failed to save lead:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
