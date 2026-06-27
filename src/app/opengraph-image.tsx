import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

// Site-wide social card (homepage + any page without its own opengraph-image).
// Blog posts override this with their Silicon Bug Files cards.
export const runtime = "nodejs";
export const alt = "ChipGPT — AI co-workers for the semiconductor lifecycle";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0b0d10";
const ACCENT = "#22c55e";
const MUTED = "#9aa4b2";
const WHITE = "#f4f4f5";

async function loadFont(spec: string, text: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${spec}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const m = css.match(/src: url\((https:[^)]+)\) format\('(truetype|opentype)'\)/);
  if (!m) throw new Error("font src not found");
  const res = await fetch(m[1]);
  if (!res.ok) throw new Error("font fetch failed");
  return res.arrayBuffer();
}
async function font(specs: string[], text: string): Promise<ArrayBuffer> {
  for (const s of specs) {
    try {
      return await loadFont(s, text);
    } catch {
      /* next */
    }
  }
  throw new Error("no font loaded");
}

export default async function Image() {
  const tagline = "AI co-workers for the semiconductor lifecycle";
  const text = `CHIPGPT.AI ${tagline} chipgpt.ai See the co-worker, live →`;

  const [sans, sansBold] = await Promise.all([
    font(["Geist:wght@500", "Inter:wght@500"], text).catch(() => null),
    font(["Geist:wght@700", "Inter:wght@700"], text).catch(() => null),
  ]);
  const fonts: { name: string; data: ArrayBuffer; style: "normal"; weight: 500 | 700 }[] = [];
  if (sans) fonts.push({ name: "sans", data: sans, style: "normal", weight: 500 });
  if (sansBold) fonts.push({ name: "sans", data: sansBold, style: "normal", weight: 700 });

  // Embed the real wordmark (black artwork) on a light plate so it reads on dark.
  const logo = fs.readFileSync(
    path.join(process.cwd(), "public", "brand", "chipgpt-wordmark.png"),
  );
  const logoUri = `data:image/png;base64,${logo.toString("base64")}`;
  const logoW = 560;
  const logoH = Math.round((logoW * 174) / 712);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: 64,
          fontFamily: "sans",
        }}
      >
        <div
          style={{ display: "flex", color: ACCENT, fontSize: 24, fontWeight: 700, letterSpacing: 4 }}
        >
          CHIPGPT.AI
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div
            style={{
              display: "flex",
              background: WHITE,
              borderRadius: 18,
              padding: "36px 48px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoUri} width={logoW} height={logoH} alt="ChipGPT" />
          </div>
          <div style={{ display: "flex", marginTop: 32, fontSize: 34, color: MUTED, maxWidth: 1000 }}>
            {tagline}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", color: WHITE, fontSize: 24, fontWeight: 700 }}>
            chipgpt.ai
          </div>
          <div style={{ display: "flex", color: ACCENT, fontSize: 22 }}>
            See the co-worker, live →
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, ...(fonts.length ? { fonts } : {}) },
  );
}
