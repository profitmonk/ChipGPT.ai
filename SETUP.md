# ChipGPT.ai — setup, environment & email

The public marketing site (Next.js 16 / Vercel). Mostly static; the configured
piece is the **Request a Briefing** form (`/demo`), which emails leads.

This document mirrors the **actual working configuration** (verified end-to-end:
a Resend send to `connect@chipgpt.ai` returns `delivered`). It is not a list of
theoretical best-practice records — it is exactly what is live.

## Architecture — three services, one domain
| Service | Role | Owns these DNS records |
|---|---|---|
| **Vercel** | Hosts the site (`chipgpt.ai`) | `A @`, `CNAME www`, `TXT _vercel` |
| **Resend** | **Sends** the form's email (from `@chipgpt.ai`) | `TXT resend._domainkey`, `TXT send`, `MX send` |
| **Proton** | **Receives** mail at `connect@chipgpt.ai` | `TXT @ protonmail-verification`, `MX @` ×2 |

DNS is at **Namecheap**. Key constraint: Resend's `send` MX requires Namecheap
**Mail Settings = "Custom MX"** (Namecheap's own Email-Forwarding can't be used at
the same time). Receiving therefore goes through **Proton** via the apex (`@`) MX.
Resend and Proton coexist because their MX records are on **different hosts**
(`send` vs `@`).

## Status — ✅ all live & verified
- ✅ **Vercel** — site live; `/demo` form + `/api/briefing` deployed.
- ✅ **Resend** — domain `chipgpt.ai` verified; sends from `briefings@chipgpt.ai`.
- ✅ **Proton** — `connect@chipgpt.ai` exists; apex MX live; test send → `delivered`.
- ✅ **Vercel env** — `RESEND_API_KEY`, `BRIEFING_FROM`, `BRIEFING_TO` set.
- ℹ️ **Proton SPF/DKIM are intentionally NOT added** — not required to *receive*
  (the MX alone routes inbound mail). Only add them later if you want to *send*
  replies *from* `connect@` with good deliverability. See note at the end.

---

## DNS records — exactly what is live (Namecheap → Domain List → chipgpt.ai → Advanced DNS)
Legend: 🟢 Vercel · 🟣 Resend (sending) · 🔵 Proton (receiving)

### HOST RECORDS (upper table) — 6 records
| Type | Host | Value | TTL | |
|---|---|---|---|---|
| A Record | `@` | `216.150.1.1` | Automatic | 🟢 |
| CNAME Record | `www` | `cname.vercel-dns.com.` | Automatic | 🟢 |
| TXT Record | `@` | `protonmail-verification=da01d2e281e56f6b678ec5cac…` | Automatic | 🔵 |
| TXT Record | `_vercel` | `vc-domain-verify=chipgpt.ai,5675e80d4e791ed2a759` | Automatic | 🟢 |
| TXT Record | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBg…` | Automatic | 🟣 |
| TXT Record | `send` | `v=spf1 include:amazonses.com ~all` | Automatic | 🟣 |

### MAIL SETTINGS = "Custom MX" (lower table) — 3 MX records
| Type | Host | Value | Priority | TTL | |
|---|---|---|---|---|---|
| MX Record | `send` | `feedback-smtp.us-east-1.amazonses.com.` | `10` | Automatic | 🟣 |
| MX Record | `@` | `mail.protonmail.ch.` | `10` | Automatic | 🔵 |
| MX Record | `@` | `mailsec.protonmail.ch.` | `20` | Automatic | 🔵 |

**Rules that keep this working:**
- MX records live **only** in the lower *Mail Settings* box (mode = **Custom MX**),
  never in the upper Host Records table.
- Keep mode on **Custom MX**. Switching to "Email Forwarding" deletes the `send`
  MX and breaks Resend.
- The two SPF records are on **different hosts** (`send` = Resend) — fine. There
  is **no apex SPF**, and that's OK (apex SPF only matters for sending *from* `@`).

---

## Step-by-step to reproduce (in the order it was built)

### A. Vercel — host the site 🟢
1. Vercel → import `profitmonk/ChipGPT.ai` → **Settings → Domains → Add `chipgpt.ai`**.
2. Vercel shows: `A @ → 216.150.1.1`, `CNAME www → cname.vercel-dns.com`, `TXT _vercel → vc-domain-verify=…`.
3. Namecheap → **Advanced DNS → Host Records → ADD NEW RECORD** → add those three.
4. Back in Vercel, wait for the domain to verify (green).

### B. Resend — enable sending from `@chipgpt.ai` 🟣
1. Resend → **Domains → Add Domain → `chipgpt.ai`**. It lists three records.
2. Namecheap **Host Records → ADD NEW RECORD** (×2):
   - `TXT` host `resend._domainkey` → value `p=MIGf…` (the DKIM key Resend shows — copy exact).
   - `TXT` host `send` → value `v=spf1 include:amazonses.com ~all`.
3. Namecheap **MAIL SETTINGS** dropdown → set to **Custom MX**. Then **ADD NEW RECORD**:
   - `MX` host `send` → value `feedback-smtp.us-east-1.amazonses.com` → priority `10`.
4. Resend → **Verify** → all three go green.

### C. Proton — enable receiving at `connect@chipgpt.ai` 🔵
*(Requires a paid Proton plan — custom domains need Mail Plus or higher.)*
1. Proton → **Settings → Domain names → Add domain → `chipgpt.ai`**.
2. Proton gives a verification TXT. Namecheap **Host Records → ADD NEW RECORD**:
   - `TXT` host `@` → value `protonmail-verification=da01d2…` (copy exact).
3. Proton → **Verify** the domain.
4. Namecheap **MAIL SETTINGS** (still **Custom MX**) → **ADD NEW RECORD** (×2),
   alongside the existing `send` MX:
   - `MX` host `@` → value `mail.protonmail.ch` → priority `10`.
   - `MX` host `@` → value `mailsec.protonmail.ch` → priority `20`.
5. In Proton, **create the address `connect@chipgpt.ai`** (mailbox or alias).
6. Click **SAVE ALL CHANGES** in the Namecheap Mail Settings box.
   *(SPF/DKIM for Proton are NOT added — see note below. Not needed to receive.)*

### D. Vercel — point the form at the verified domain
In **Vercel → ChipGPT.ai → Settings → Environment Variables** (Production + Preview);
for local `next dev`, mirror in **`ChipGPT.ai/.env.local`** (gitignored):

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | `re_…` |
| `BRIEFING_FROM` | `ChipGPT Briefings <briefings@chipgpt.ai>` |
| `BRIEFING_TO` | `connect@chipgpt.ai` |

**Redeploy after any env change** (env applies only to new deployments).

---

## How the form works
`/demo` form → `POST /api/briefing` → Resend → `BRIEFING_TO`, with **Reply-To = the
visitor** (so a reply goes straight to the lead). A hidden honeypot field drops
bots. Real Resend errors are logged to Vercel function logs (`[briefing] …`); the
visitor only sees a generic "please email connect@chipgpt.ai".

## Verify / diagnose
End-to-end: submit `chipgpt.ai/demo` → it should arrive in the Proton `connect@`
inbox; Reply goes to the visitor. To probe sending + delivery directly:
```bash
# send
id=$(curl -s -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer $RESEND_API_KEY" -H "Content-Type: application/json" \
  -d '{"from":"ChipGPT Briefings <briefings@chipgpt.ai>","to":["connect@chipgpt.ai"],"subject":"test","text":"hi"}' \
  | python3 -c "import sys,json;print(json.load(sys.stdin)['id'])")
# delivery status (delivered / bounced)
curl -s -H "Authorization: Bearer $RESEND_API_KEY" "https://api.resend.com/emails/$id" \
  | python3 -c "import sys,json;print(json.load(sys.stdin)['last_event'])"
```
- `delivered` = full loop works (current state).
- `bounced` = receiving side — check `dig MX chipgpt.ai` returns the Proton MX and
  that `connect@` exists in Proton.
- `403 "domain is not verified"` at send = a Resend record (`send` MX/SPF or DKIM)
  is missing/pending.
- DNS changes propagate in ~10–30 min; query the authoritative NS to see saved
  state immediately: `dig MX chipgpt.ai @dns1.registrar-servers.com`.

## Note — Proton SPF/DKIM (optional, not currently added)
Receiving needs only the **MX**, which is why the live setup omits them. Add them
**only** when you want to *send* replies from `connect@chipgpt.ai` via Proton:
- SPF: `TXT @` → `v=spf1 include:_spf.protonmail.ch ~all` — ⚠️ only ONE SPF per
  host; since there's no apex SPF today you're clear (Resend's is on `send`).
- DKIM: the **3 CNAMEs** Proton's wizard shows (`protonmail._domainkey`,
  `protonmail2…`, `protonmail3…` → `…domains.proton.ch.`) — unique per domain.
- (Optional) DMARC: `TXT _dmarc` → `v=DMARC1; p=none;`.

## Other site notes
- **`/coworker`** = the live demo, wrapping `public/coworker-app/` (an iframe).
  Those files are **generated** by `chipgpt/scripts/build_coworker.py` — don't hand-edit.
- **`/blog`** = markdown in `content/blog/*.md` (frontmatter: title, description,
  date, optional author/featured; featured pins to top).
- Deploy: edit → push a branch → Vercel preview → merge to `main` → live.
