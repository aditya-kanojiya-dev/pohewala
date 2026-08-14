import "server-only";

// ponytail: fire-and-forget WhatsApp alert for new leads via Meta's Cloud API.
// Plain fetch, no SDK. No-ops when env vars are unset (local dev).
// Meta only allows plain text outside the 24h customer session; for reliable
// out-of-session alerts set WHATSAPP_TEMPLATE_NAME to an approved template that
// takes (name, phone, email, message) as body parameters.

const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const TO = process.env.WHATSAPP_ADMIN_NUMBER;
const TEMPLATE_NAME = process.env.WHATSAPP_TEMPLATE_NAME;
const TEMPLATE_LANG = process.env.WHATSAPP_TEMPLATE_LANGUAGE ?? "en_US";

export async function notifyWhatsApp(lead: {
  name: string;
  phone: string;
  email: string;
  message?: string;
}) {
  if (!PHONE_NUMBER_ID || !ACCESS_TOKEN || !TO) return;

  const payload = TEMPLATE_NAME
    ? {
        type: "template",
        template: {
          name: TEMPLATE_NAME,
          language: { code: TEMPLATE_LANG },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: lead.name },
                { type: "text", text: lead.phone },
                { type: "text", text: lead.email },
                { type: "text", text: lead.message ?? "" },
              ],
            },
          ],
        },
      }
    : {
        type: "text",
        text: `New Pohewala enquiry: ${lead.name} | ${lead.phone} | ${lead.email}${lead.message ? ` | ${lead.message}` : ""}`,
      };

  const res = await fetch(
    `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messaging_product: "whatsapp", to: TO, ...payload }),
    }
  );
  if (!res.ok) {
    console.error("WhatsApp notify failed:", res.status, await res.text().catch(() => ""));
  }
}
