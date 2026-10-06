import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

// Social card for /rle — same branded pattern as the site-wide card.
export const runtime = "nodejs";
export const alt = "ChipGPT Engineering RLE — executable evaluation for silicon-engineering agents";
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
  const kicker = "ENGINEERING RLE";
  const headline = "Know whether an AI agent can engineer silicon — not merely write Verilog.";
  const footer = "Executable RTL · DV · firmware · coverage tasks";
  const text = `${kicker} ${headline} ${footer} chipgpt.ai/rle`;

  const [sans, sansBold] = await Promise.all([
    font(["Geist:wght@500", "Inter:wght@500"], text).catch(() => null),
    font(["Geist:wght@700", "Inter:wght@700"], text).catch(() => null),
  ]);
  const fonts: { name: string; data: ArrayBuffer; style: "normal"; weight: 500 | 700 }[] = [];
  if (sans) fonts.push({ name: "sans", data: sans, style: "normal", weight: 500 });
  if (sansBold) fonts.push({ name: "sans", data: sansBold, style: "normal", weight: 700 });

  const logo = fs.readFileSync(
    path.join(process.cwd(), "public", "brand", "chipgpt-wordmark-white.png"),
  );
  const logoUri = `data:image/png;base64,${logo.toString("base64")}`;
  const logoW = 300;
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <img src={logoUri} width={logoW} height={logoH} alt="ChipGPT" />
          <div style={{ display: "flex", color: ACCENT, fontSize: 24, fontWeight: 700, letterSpacing: 4 }}>
            {kicker}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 60, fontWeight: 700, color: WHITE, lineHeight: 1.12, maxWidth: 1040 }}>
          {headline}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", color: MUTED, fontSize: 26 }}>{footer}</div>
          <div style={{ display: "flex", color: WHITE, fontSize: 24, fontWeight: 700 }}>chipgpt.ai/rle</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, ...(fonts.length ? { fonts } : {}) },
  );
}
