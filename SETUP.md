# ChipGPT.ai — setup, environment & email

The public marketing site (Next.js 16 / Vercel). Mostly static; the configured
piece is the **Request a Briefing** form (`/demo`), which emails leads.

## Architecture — three services, one domain
| Service | Role | Touches |
|---|---|---|
| **Vercel** | Hosts the site (`chipgpt.ai`) + the form's API route | env vars; apex `A` / `www` CNAME |
| **Resend** | **Sends** the form's email (from `@chipgpt.ai`) | `send` MX/SPF + `resend._domainkey` DKIM |
| **Proton** | **Receives** mail at `connect@chipgpt.ai` | apex MX + SPF + Proton DKIM |

DNS is at **Namecheap**. Key constraint: Resend's `send` MX requires Namecheap
**Mail Settings = "Custom MX"** — which means Namecheap's own Email-Forwarding can't
be used at the same time. So **receiving goes through Proton** (apex MX), and Resend
and Proton coexist because they're on different hosts (`send` vs `@`).

## Status
- ✅ **Vercel** site live; form + `/api/briefing` deployed.
- ✅ **Resend** domain `chipgpt.ai` verified (DKIM + `send` SPF/MX) — sending works.
- ⬜ **Proton receiving** — apex MX + SPF + DKIM **still to add**, and the
  `connect@chipgpt.ai` address must be created in Proton. **Until this is done,
  `connect@` does not receive** (apex MX is empty → mail bounces).

---

## DNS records (final state, at Namecheap → Advanced DNS)
Legend: 🟢 Vercel · 🟣 Resend (sending) · 🔵 Proton (receiving) · ⭐ unique — copy exact value from the provider.

### HOST RECORDS (top section)
| Type | Host | Value | |
|---|---|---|---|
| A | `@` | `216.150.1.1` | 🟢 don't touch |
| CNAME | `www` | `cname.vercel-dns.com.` | 🟢 don't touch |
| TXT | `_vercel` | `vc-domain-verify=chipgpt.ai,5675e80d4e791ed2a759` | 🟢 don't touch |
| TXT | `resend._domainkey` | `p=MIGfMA0…` | 🟣 ⭐ ✅ |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | 🟣 ✅ |
| TXT | `@` | `protonmail-verification=da01d2e281e56f…` | 🔵 ⭐ ✅ |
| TXT | `@` | `v=spf1 include:_spf.protonmail.ch ~all` | 🔵 ⬜ add |
| CNAME | `protonmail._domainkey` | `…domains.proton.ch.` | 🔵 ⭐ ⬜ add |
| CNAME | `protonmail2._domainkey` | `…domains.proton.ch.` | 🔵 ⭐ ⬜ add |
| CNAME | `protonmail3._domainkey` | `…domains.proton.ch.` | 🔵 ⭐ ⬜ add |
| TXT | `_dmarc` | `v=DMARC1; p=none;` | optional, one only |

### MAIL SETTINGS → "Custom MX" (bottom section — MX records live here)
| Host | Value | Priority | |
|---|---|---|---|
| `send` | `feedback-smtp.us-east-1.amazonses.com` | `10` | 🟣 ✅ |
| `@` | `mail.protonmail.ch` | `10` | 🔵 ⬜ add |
| `@` | `mailsec.protonmail.ch` | `20` | 🔵 ⬜ add |

**Rules:** only ONE SPF per host (apex SPF = Proton's; Resend's is on `send`); only
ONE `_dmarc`; never edit the 🟢 Vercel rows; keep Mail Settings on **Custom MX**
(switching to Email Forwarding deletes the `send` MX and breaks Resend).

---

## Steps per service

### Resend (sending) — ✅ done, for reference
1. Resend → **Domains → Add Domain** → `chipgpt.ai`.
2. Add the 3 records it shows → Namecheap: `send` MX (Custom MX), `send` SPF (TXT),
   `resend._domainkey` DKIM (TXT).
3. Resend → **Verify** (green).

### Proton (receiving `connect@`) — ⬜ remaining
1. Proton → **Settings → Domain names → chipgpt.ai** → it lists the records.
2. Namecheap **Custom MX**: add apex MX → `mail.protonmail.ch` (10),
   `mailsec.protonmail.ch` (20). *(Leave the `send` MX as-is — different host, no conflict.)*
3. Namecheap **Host Records**: add Proton SPF (`@` → `v=spf1 include:_spf.protonmail.ch ~all`)
   and the 3 Proton DKIM CNAMEs (`protonmail._domainkey`, `protonmail2…`, `protonmail3…`).
4. Proton → **Verify**, then **create the address `connect@chipgpt.ai`** (mailbox or
   alias — requires a paid Proton plan for custom domains).

### Vercel (the app + env)
Set in **Vercel → ChipGPT.ai → Settings → Environment Variables** (Production +
Preview); for local `next dev` use **`ChipGPT.ai/.env.local`**. `.env*` is gitignored.

| Variable | Value | Notes |
|---|---|---|
| `RESEND_API_KEY` | `re_…` | ✅ set |
| `BRIEFING_FROM` | `ChipGPT Briefings <briefings@chipgpt.ai>` | must be on the verified domain (no mailbox needed to *send*) |
| `BRIEFING_TO` | `connect@chipgpt.ai` | the Proton inbox (works once Proton receiving is live) |

**After any env change, redeploy** (env applies only to new deployments).

---

## How the form works
`/demo` form → `POST /api/briefing` → Resend → `BRIEFING_TO`, **Reply-To = the
visitor** (reply goes to the lead). Honeypot drops bots. Real Resend errors are
logged to Vercel function logs (`[briefing] …`); the visitor sees a generic
"please email connect@chipgpt.ai".

## Verify / diagnose
End-to-end: submit `chipgpt.ai/demo` → it should land in the Proton `connect@`
inbox; Reply goes to the visitor. Diagnose a send directly:
```bash
curl -X POST https://api.resend.com/emails -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"from":"ChipGPT Briefings <briefings@chipgpt.ai>","to":["connect@chipgpt.ai"],"subject":"test","text":"hi"}'
```
- `200 {"id":…}` = Resend sent it. If it doesn't arrive, the gap is **receiving**
  (Proton apex MX / address) — check `dig MX chipgpt.ai` is non-empty.
- `403 "domain is not verified"` = a Resend record (`send` MX/SPF/DKIM) is pending.

## Other site notes
- **`/coworker`** = the live demo, wrapping `public/coworker-app/` (an iframe).
  Those files are **generated** by `chipgpt/scripts/build_coworker.py` — don't hand-edit.
- **`/blog`** = markdown in `content/blog/*.md` (frontmatter: title, description,
  date, optional author/featured; featured pins to top).
- Deploy: edit → push a branch → Vercel preview → merge to `main` → live.
