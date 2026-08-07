import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  checkAdminPassword,
  clientIp,
  isSameOrigin,
  loginAllowed,
  recordFailedLogin,
  recordSuccessfulLogin,
  SESSION_COOKIE,
  signSession,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return Response.json({ error: "Invalid request." }, { status: 403 });
  }
  const ip = clientIp(request);
  if (!(await loginAllowed(ip))) {
    return Response.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }
  const form = await request.formData();
  const password = String(form.get("password") ?? "");

  if (!checkAdminPassword(password)) {
    await recordFailedLogin(ip);
    redirect("/admin?error=1");
  }

  await recordSuccessfulLogin(ip);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, signSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}
