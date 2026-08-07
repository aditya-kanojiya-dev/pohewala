// Self-check for the admin session logic.
// Run: node --conditions=react-server scripts/check-auth.mts
import assert from "node:assert";
import { checkAdminPassword, signSession, verifySession } from "../src/lib/auth.ts";

process.env.AUTH_SECRET = "test-secret";
process.env.ADMIN_PASSWORD = "test-pass";

const token = signSession();
assert.ok(verifySession(token), "valid token should verify");
assert.ok(!verifySession(undefined), "missing token should fail");
assert.ok(!verifySession(""), "empty token should fail");
assert.ok(!verifySession("garbage.token.value"), "malformed token should fail");
assert.ok(!verifySession("not-a-number.deadbeef.deadbeef"), "non-numeric expiry should fail");
assert.ok(!verifySession("9999999999999999.abc.deadbeef"), "expired token should fail");
const tampered = token.slice(0, -1) + (token.endsWith("0") ? "1" : "0");
assert.ok(!verifySession(tampered), "tampered token should fail");
assert.ok(checkAdminPassword("test-pass"), "correct password should pass");
assert.ok(!checkAdminPassword("wrong"), "wrong password should fail");

console.log("auth self-check OK");
