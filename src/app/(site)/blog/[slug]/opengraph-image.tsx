import { ImageResponse } from "next/og";
import { getPost } from "@/lib/blog";

// getPost reads the markdown files, so this must run on the Node runtime.
export const runtime = "nodejs";
export const alt = "ChipGPT — Silicon Bug Files";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0b0d10";
const ACCENT = "#22c55e"; // the repo's real accent (green)
const DANGER = "#f0716a";
const MUTED = "#9aa4b2";
const WHITE = "#f4f4f5";

// Load a Google Font as TTF for satori. Node's default fetch UA makes the CSS2
// endpoint return a truetype src, which satori can use (woff2 would not work).
async function loadFont(spec: string, text: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${spec}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const m = css.match(/src: url\((https:[^)]+)\) format\('(truetype|opentype)'\)/);
  if (!m) throw new Error(`font src not found: ${spec}`);
  const res = await fetch(m[1]);
  if (!res.ok) throw new Error(`font fetch failed: ${spec}`);
  return res.arrayBuffer();
}

// Try Geist first (the brand face), fall back to widely-available faces.
async function font(specs: string[], text: string): Promise<ArrayBuffer> {
  for (const s of specs) {
    try {
      return await loadFont(s, text);
    } catch {
      /* try next */
    }
  }
  throw new Error(`no font loaded: ${specs.join(", ")}`);
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const m = post?.meta;

  const number = m?.bugNumber ?? "";
  const codename = m?.codename ?? m?.title ?? "Silicon bug files";
  const ogMono = m?.ogMono ?? "";
  const stakes = m?.stakes ?? m?.description ?? "";
  const severity = m?.severity ?? "silent failure";
  const evidence = m?.evidence ?? "";

  // Glyph subset for the fonts (keeps the fetch tiny).
  const text =
    "SILICON BUG FILES No. ChipGPT See the co-worker catch it, live CG " +
    `${number} ${codename} ${stakes} ${severity} ${evidence} ` +
    "0123456789 →·+/✓✗[]<>'\"";

  const [sans, sansBold, mono] = await Promise.all([
    font(["Geist:wght@500", "Inter:wght@500"], text),
    font(["Geist:wght@700", "Inter:wght@700"], text),
    font(["Geist+Mono:wght@500", "JetBrains+Mono:wght@500"], text),
  ]);

  // Codename: optionally render one fragment in mono red (e.g. "+1").
  let cnBefore = codename;
  let cnFrag = "";
  let cnAfter = "";
  if (ogMono && codename.includes(ogMono)) {
    const i = codename.indexOf(ogMono);
    cnBefore = codename.slice(0, i);
    cnFrag = ogMono;
    cnAfter = codename.slice(i + ogMono.length);
  }

  // Evidence: split a trailing "// comment" into a muted span.
  const ci = evidence.indexOf("//");
  const evMain = ci >= 0 ? evidence.slice(0, ci) : evidence;
  const evComment = ci >= 0 ? evidence.slice(ci) : "";

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
          color: WHITE,
          padding: 64,
          fontFamily: "sans",
        }}
      >
        {/* top strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                color: ACCENT,
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 4,
              }}
            >
              SILICON BUG FILES
            </div>
            {number ? (
              <div
                style={{
                  display: "flex",
                  marginLeft: 22,
                  color: MUTED,
                  fontSize: 24,
                  fontFamily: "mono",
                }}
              >
                No. {number}
              </div>
            ) : null}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 22px",
              borderRadius: 999,
              background: "rgba(240,113,106,0.14)",
              border: "1px solid rgba(240,113,106,0.45)",
              color: DANGER,
              fontSize: 20,
            }}
          >
            {severity}
          </div>
        </div>

        {/* hero */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            <span style={{ display: "flex" }}>{cnBefore}</span>
            {cnFrag ? (
              <span style={{ display: "flex", color: DANGER, fontFamily: "mono" }}>
                {cnFrag}
              </span>
            ) : null}
            {cnAfter ? <span style={{ display: "flex" }}>{cnAfter}</span> : null}
          </div>
          {stakes ? (
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontSize: 30,
                color: MUTED,
                maxWidth: 1010,
              }}
            >
              {stakes}
            </div>
          ) : null}
          {evidence ? (
            <div
              style={{ display: "flex", marginTop: 30, fontSize: 24, fontFamily: "mono" }}
            >
              <span style={{ display: "flex", color: "#cbd5e1" }}>{evMain}</span>
              {evComment ? (
                <span style={{ display: "flex", color: MUTED }}>{evComment}</span>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                width: 46,
                height: 46,
                borderRadius: 11,
                background: ACCENT,
                alignItems: "center",
                justifyContent: "center",
                color: "#04140a",
                fontSize: 19,
                fontWeight: 700,
                fontFamily: "mono",
              }}
            >
              CG
            </div>
            <div style={{ display: "flex", marginLeft: 16, fontSize: 26, fontWeight: 700 }}>
              ChipGPT
            </div>
          </div>
          <div style={{ display: "flex", color: ACCENT, fontSize: 22 }}>
            See the co-worker catch it, live →
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "sans", data: sans, style: "normal", weight: 500 },
        { name: "sans", data: sansBold, style: "normal", weight: 700 },
        { name: "mono", data: mono, style: "normal", weight: 500 },
      ],
    },
  );
}
