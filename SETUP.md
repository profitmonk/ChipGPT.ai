# ChipGPT.ai — setup & environment

The public marketing site (Next.js 16 / Vercel). Most of it is static. The one
piece that needs configuration is the **Request a Briefing** form (`/demo`), which
emails leads via [Resend](https://resend.com).

## Environment variables

Set these in **Vercel → ChipGPT.ai → Settings → Environment Variables** (Production
+ Preview). For local `next dev`, put them in **`ChipGPT.ai/.env.local`** (this
folder — Next loads `.env.local` from the project root, not the workspace root).
`.env*` is gitignored — never commit secrets.

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `RESEND_API_KEY` | **yes** (to send) | — | Resend API key (`re_…`). Without it the form returns a friendly "email isn't connected yet" message instead of failing silently. |
| `BRIEFING_TO` | no | `connect@chipgpt.ai` | Where briefing requests are delivered. Use `profitmonk@gmail.com` until the domain mailbox is set up. |
| `BRIEFING_FROM` | no | `ChipGPT Briefings <onboarding@resend.dev>` | The sender. After verifying `chipgpt.ai` in Resend, set to `ChipGPT Briefings <briefings@chipgpt.ai>`. |

> **After changing any env var in Vercel, redeploy** — env changes only apply to
> new deployments (Deployments → ⋯ → Redeploy, or push a commit).

## Email sending — two independent concerns

- **SENDING** (form emails out *from* `@chipgpt.ai`): verify the domain in Resend
  (DNS records below). Required to deliver to anything other than the Resend
  account-owner email.
- **RECEIVING** (`connect@chipgpt.ai` actually gets mail): Namecheap email
  forwarding. Only needed if `BRIEFING_TO=connect@chipgpt.ai`. Simplest path is to
  set `BRIEFING_TO` to a Gmail you already control and skip this.

### A. Verify the sending domain (Resend + Namecheap DNS)
1. Resend → **Domains → Add Domain** → `chipgpt.ai`. It shows 3 records (copy the
   exact values — the DKIM value is unique).
2. Namecheap → `chipgpt.ai` → **Advanced DNS → Host Records**. Enter the **subdomain
   only** in Host (Namecheap appends `.chipgpt.ai`):
   | Type | Host | Value | Priority |
   |---|---|---|---|
   | MX | `send` | `feedback-smtp.us-east-1.amazonses.com` | `10` |
   | TXT | `send` | `v=spf1 include:amazonses.com ~all` | — |
   | TXT | `resend._domainkey` | *(the long `p=…` DKIM value from Resend)* | — |
   | TXT *(optional)* | `_dmarc` | `v=DMARC1; p=none;` | — |
3. In Resend click **Verify** (propagation ~10–30 min).
4. Set `BRIEFING_FROM=ChipGPT Briefings <briefings@chipgpt.ai>` in Vercel; redeploy.

### B. Receive at connect@chipgpt.ai (optional — Namecheap forwarding)
Uses apex MX; does not conflict with the `send` MX above.
1. Namecheap → `chipgpt.ai` → **Advanced DNS → Mail Settings → Email Forwarding**
   (auto-adds the forwarding MX on `@`).
2. **Redirect Email → Add Forwarder:** `connect` → `profitmonk@gmail.com`.
3. Set `BRIEFING_TO=connect@chipgpt.ai` in Vercel; redeploy.

## How the form behaves
- Posts to `POST /api/briefing` → Resend → `BRIEFING_TO`, with **Reply-To = the
  visitor** (reply goes straight to the lead). Honeypot field drops bots.
- Real Resend errors are logged to Vercel function logs (`[briefing] …`); the
  visitor sees a generic "please email connect@chipgpt.ai".
- Diagnose a send failure quickly:
  ```bash
  curl -X POST https://api.resend.com/emails -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{"from":"ChipGPT Briefings <onboarding@resend.dev>","to":["<your-resend-account-email>"],"subject":"test","text":"hi"}'
  ```
  `403 "can only send testing emails to your own address"` → verify the domain (A).

## Other site notes
- **`/coworker`** wraps the interactive demo (iframe of `public/coworker-app/`).
  Those static files are **generated** from the `chipgpt` product repo via
  `chipgpt/scripts/build_coworker.py` — don't hand-edit `public/coworker-app/`.
- **`/blog`** posts are markdown in `content/blog/*.md` (frontmatter: title,
  description, date, optional author/featured); featured posts pin to the top.
- Deploy: edit → push a branch → Vercel preview → merge to `main` → live.
