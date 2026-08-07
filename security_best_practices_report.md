# Pohewala Security Report

Audit date: 2026-08-07. Scope: the lead-capture + admin-panel work added on top of the
static Next.js site (Route Handlers, `src/lib/db.ts`, `src/lib/leads.ts`, `src/lib/auth.ts`,
`src/app/admin/*`, form wiring). Baseline: Next.js 16.2.12, React 19, `pg`, Vercel + managed Postgres.

## Executive summary

No critical or high-risk application-logic flaws were found in the code we added. Inputs are
validated at runtime, all SQL is parameterized, the admin panel is enforced server-side, the
session cookie is HttpOnly + SameSite=Lax + Secure-in-production, and the admin login/logout
endpoints are CSRF-protected via an Origin check. One high-severity **dependency** issue
(vulnerable `sharp`/`postcss` transitively pulled by `next`) was found and fixed with npm
`overrides`. Remaining items are Medium/Low hardening and are addressed or documented below.

## Fixed (HIGH)

### HS-01 — Vulnerable transitive `sharp` and `postcss` via `next`
- **Severity:** High
- **Location:** `package.json` dependencies → `next@16.2.12` pulls `sharp@0.34.5` and `postcss@<=8.5.22`
- **Evidence:** `npm audit` reported 3 high findings: `sharp <0.35.0` inherits libvips CVEs
  (CVE-2026-33327/33328/35590/35591, GHSA-f88m-g3jw-g9cj) and `postcss <=8.5.22` has XSS /
  arbitrary-file-read advisories (GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q, GHSA-r28c-9q8g-f849).
- **Impact:** `next/image` optimization (self-hosted) and CSS build pipeline run vulnerable native code.
- **Fix (applied):** added `"overrides": { "sharp": "^0.35.3", "postcss": "^8.5.26" }` to
  `package.json`; `npm audit` now reports **0 vulnerabilities**.
- **Verify:** re-run `npm run build` (passes) and `npm audit`.

## Fixed (MEDIUM)

### MS-01 — No rate limiting on the admin login endpoint
- **Severity:** Medium
- **Location:** `src/app/api/admin/login/route.ts` (`POST`)
- **Impact:** unlimited online brute-force attempts against the single admin password.
- **Mitigation that already exists:** timing-safe compare (`src/lib/auth.ts:44`), password set
  server-side, fail-closed when unset.
- **Fix (applied):** per-IP login throttle stored in Postgres (`login_attempts` table,
  auto-created like `leads`): 5 failed attempts → 15-minute block. DB-backed so it holds across
  serverless instances; fail-open so a limiter outage never bricks the login.

### MS-02 — No security headers configured in the app
- **Severity:** Medium
- **Location:** no `next.config.*` existed; headers were left to the host.
- **Impact:** possible MIME sniffing, clickjacking, referrer leakage.
- **Fix (applied):** added `next.config.ts` with `headers()` returning:
  `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- **Follow-up (not done):** a `Content-Security-Policy`. The site renders no user-controlled HTML
  (React escaping only; the one `dangerouslySetInnerHTML` is static JSON-LD), so the XSS surface is
  small, and a strict CSP needs nonce plumbing for Next's inline hydration scripts. Add via
  Next.js nonce guidance before adding any third-party client scripts.

## Fixed (LOW)

### LS-01 — `dangerouslySetInnerHTML` for JSON-LD (static, safe; hardened anyway)
- **Location:** `src/app/layout.tsx:67`
- **Evidence:** `dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}` where `jsonLd` is a
  hardcoded object (no user input). Not currently exploitable.
- **Fix (applied):** escape `<` as `\u003c` before injection so a future dynamic value can never
  break out of the `<script>` tag.

### LS-02 — Server-only modules lack a compile-time client-bundle guard
- **Location:** `src/lib/db.ts`, `src/lib/auth.ts`, `src/lib/leads.ts`
- **Impact today:** none — these are only imported by Route Handlers and the `/admin` server page.
  The guard exists so a future refactor that imports them into a `"use client"` component fails at
  build instead of leaking `DATABASE_URL`/HMAC logic to the browser.
- **Fix (applied):** added `import "server-only"` to all three.

## Accepted / informational (no code change)

- **INFO-01 — Lead PII in plaintext.** Contact data (name/email/phone/message) is stored
  unencrypted in Postgres. Standard for a lead form. Keep the DB access-restricted, encrypted at
  rest (managed providers do this by default), and only expose it via the authenticated `/admin`.
- **INFO-02 — `/api/leads` is a public, unauthenticated POST.** Required for the public forms.
  Anti-spam is a honeypot field + server-side length/format validation; no per-IP throttle. For an
  inquiry-only site this is an accepted trade-off. If spam becomes a problem, add a managed rate
  limiter or a CAPTCHA.
- **INFO-03 — `BIGSERIAL` lead IDs.** Only rendered inside the authenticated admin panel; never
  exposed publicly, so the guessable-ID advice does not apply.
- **INFO-04 — CSRF posture.** Admin login/logout are Origin-vs-Host checked
  (`isSameOrigin`, `src/lib/auth.ts:38`); the session cookie is `SameSite=Lax` + `HttpOnly` +
  `Secure` in production. The public `/api/leads` endpoint is CSRF-immaterial (it is intended to be
  callable cross-origin and holds no cookie auth).
- **INFO-05 — Supported Next line.** `next@16.2.12` is current-stable; the react2shell advisory
  (CVE-2025-66478) is fixed since 16.0.7.
- **INFO-06 — Admin panel reachability.** `/admin` is server-rendered, `force-dynamic`, gated by
  `verifySession()` server-side, and excluded from `robots.txt`. A password alone gates it; consider
  IP allowlisting if the site runs behind a VPN.
- **INFO-07 — No session table/rotation.** Sessions are stateless HMAC-signed cookies with a 7-day
  TTL; invalidated on secret rotation. Acceptable for a single-admin panel
  (`ponytail:` note in `src/lib/auth.ts`).

## Verification performed

- `npm audit` → 0 vulnerabilities.
- `npx tsc --noEmit` → clean.
- `npm run lint` → clean (after eslint 9 downgrade for the pre-existing eslint-plugin-react/eslint-10 mismatch).
- `npm run build` → passes (17 static pages, dynamic `/admin` + API routes).
- Runtime: wrong password → 303 `/admin?error=1`; invalid lead payloads → 400 with message;
  `/admin` renders login and leaks nothing; `/robots.txt` + `/sitemap.xml` serve correctly;
  security headers present on all routes.
- `node --conditions=react-server scripts/check-auth.mts` self-check → OK.
