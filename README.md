# PHAK Flight Path

A 143-session study tracker for the FAA Pilot's Handbook of Aeronautical Knowledge.
Static site: one `index.html`, with optional Supabase sync for progress and debrief notes.

## Deploy (Vercel + GitHub)

1. In Supabase, run `supabase.sql` in the SQL Editor.
2. Push this repo to GitHub and import it in Vercel (Framework Preset: **Other**).
3. In Vercel → Project → Settings → Environment Variables, add:
   - `SUPABASE_URL`: your Project URL
   - `SUPABASE_ANON_KEY`: your **anon / publishable** key (never the service_role key)
4. Redeploy. The build writes `config.js` from these variables; it is git-ignored.
5. In Supabase → Authentication → URL Configuration, set Site URL and Redirect URLs to your Vercel address.

Without the variables the site still works and saves progress in the browser only.
