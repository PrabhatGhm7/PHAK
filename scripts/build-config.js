// Runs on Vercel at build time. Writes config.js from environment variables
// so the Supabase values never have to be committed to GitHub.
const fs = require("fs");

const url = process.env.SUPABASE_URL || "";
const anonKey = process.env.SUPABASE_ANON_KEY || "";

// Safety check: refuse to ship a service_role key to the browser.
function payload(jwt) {
  try { return JSON.parse(Buffer.from(jwt.split(".")[1], "base64url").toString()); } catch { return {}; }
}
if (anonKey && (payload(anonKey).role === "service_role" || anonKey.startsWith("sb_secret_"))) {
  console.error("SUPABASE_ANON_KEY is a secret/service_role key. Use the anon (publishable) key instead.");
  process.exit(1);
}
if (!url || !anonKey) {
  console.warn("SUPABASE_URL or SUPABASE_ANON_KEY not set: the site will save progress in the browser only.");
}

fs.writeFileSync(
  "config.js",
  "window.PHAK_CONFIG = " + JSON.stringify({ supabaseUrl: url, supabaseAnonKey: anonKey }) + ";\n"
);
console.log("Wrote config.js");
