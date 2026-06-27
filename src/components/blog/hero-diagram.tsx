// Per-post hero diagrams: one purpose-built, hand-authored inline SVG per bug post,
// rendered right under the TL;DR. Shared visual grammar:
//   correct/expected = pass green, the bug = danger red, neutral structure = slate.
// Monospace for values. Dark, flat, ~1.9:1, screenshot-friendly, a11y via role=img
// + <title>/<desc>. Keyed by slug so a new post opts in by adding an entry here.
import type { ReactNode } from "react";

const PASS = "#86C166";
const DANGER = "#F0716A";
const SLATE = "#5C6675";
const ACCENT = "#22c55e";
const MUTED = "#9AA4B2";
const TEXT = "#d4d4d8";
const WHITE = "#f4f4f5";
const HAIR = "rgba(255,255,255,0.10)";

const MONO = "font-mono";
const SANS = "font-sans";

function Frame({
  label,
  desc,
  children,
}: {
  label: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <figure className="panel mb-10 overflow-hidden rounded-md">
      <svg
        viewBox="0 0 760 400"
        role="img"
        aria-label={`${label}. ${desc}`}
        className="block h-auto w-full"
        style={{ background: "#0b0d10", fontFamily: "var(--font-geist-sans)" }}
      >
        <title>{label}</title>
        <desc>{desc}</desc>
        <defs>
          <marker id="ahRed" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
            <path d="M0,0 L6.5,3 L0,6 Z" fill={DANGER} />
          </marker>
          <marker id="ahSlate" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
            <path d="M0,0 L6.5,3 L0,6 Z" fill={SLATE} />
          </marker>
          <marker id="ahPass" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
            <path d="M0,0 L6.5,3 L0,6 Z" fill={PASS} />
          </marker>
        </defs>
        {children}
      </svg>
    </figure>
  );
}

/* 04 — One Missing +1 (AES): all green, still broken. */
function AesDiagram() {
  const checks = [
    { x: 40, t: "synthesis", ok: true },
    { x: 215, t: "vectors", ok: true },
    { x: 360, t: "coverage", ok: true },
    { x: 560, t: "secure", ok: false },
  ];
  return (
    <>
      <text x={40} y={50} className={MONO} fontSize={12} letterSpacing="2" fill={MUTED}>
        AES-CTR · COUNTER REGISTER
      </text>

      <text x={40} y={118} className={SANS} fontSize={15} fill={MUTED}>shipped</text>
      <text x={150} y={120} className={MONO} fontSize={21} fill={DANGER}>ctr → 0  0  0  0</text>
      <text x={470} y={120} className={MONO} fontSize={13} fill={DANGER}>// keystream reused</text>

      <text x={40} y={170} className={SANS} fontSize={15} fill={MUTED}>spec</text>
      <text x={150} y={172} className={MONO} fontSize={21} fill={PASS}>ctr → 0  1  2  3</text>
      <text x={470} y={172} className={MONO} fontSize={13} fill={PASS}>// fresh every block</text>

      <line x1={40} y1={214} x2={720} y2={214} stroke={HAIR} />

      {checks.map((c) => (
        <text
          key={c.t}
          x={c.x}
          y={278}
          className={MONO}
          fontSize={16}
          fill={c.ok ? PASS : DANGER}
        >
          {c.t} {c.ok ? "✓" : "✗"}
        </text>
      ))}

      <text x={40} y={350} className={SANS} fontSize={20} fontWeight={600} fill={WHITE}>
        all green,{" "}
        <tspan fill={DANGER}>still broken</tspan>
      </text>
    </>
  );
}

/* 02 — The bug your simulator can't see (CDC). */
function CdcDiagram() {
  const panel = (x: number, header: string, headerColor: string, glitch: boolean) => (
    <g>
      <rect x={x} y={70} width={320} height={250} rx={6} fill="none" stroke={HAIR} />
      <text x={x + 18} y={100} className={MONO} fontSize={12} letterSpacing="1" fill={headerColor}>
        {header}
      </text>
      <text x={x + 18} y={140} className={MONO} fontSize={12} fill={MUTED}>clk A</text>
      <text x={x + 18} y={250} className={MONO} fontSize={12} fill={MUTED}>clk B</text>
      {/* clk A waveform */}
      <polyline
        points={`${x + 70},150 ${x + 110},150 ${x + 110},128 ${x + 160},128 ${x + 160},150 ${x + 210},150 ${x + 210},128 ${x + 260},128 ${x + 260},150 ${x + 295},150`}
        fill="none"
        stroke={SLATE}
        strokeWidth={2}
      />
      {/* crossing arrow A -> B at the sampling instant */}
      <line
        x1={x + 185}
        y1={150}
        x2={x + 185}
        y2={232}
        stroke={glitch ? DANGER : SLATE}
        strokeWidth={1.5}
        strokeDasharray="3 3"
        markerEnd={glitch ? "url(#ahRed)" : "url(#ahSlate)"}
      />
      {/* clk B sampled value */}
      {glitch ? (
        <>
          <polyline
            points={`${x + 70},250 ${x + 150},250 ${x + 160},226 ${x + 168},252 ${x + 176},228 ${x + 184},250 ${x + 192},230 ${x + 200},250 ${x + 295},250`}
            fill="none"
            stroke={DANGER}
            strokeWidth={2}
          />
          <rect
            x={x + 150}
            y={206}
            width={64}
            height={70}
            rx={4}
            fill="none"
            stroke={DANGER}
            strokeWidth={1}
            strokeDasharray="4 3"
          />
          <text x={x + 182} y={300} textAnchor="middle" className={MONO} fontSize={11} fill={DANGER}>
            metastable
          </text>
        </>
      ) : (
        <>
          <polyline
            points={`${x + 70},250 ${x + 185},250 ${x + 185},228 ${x + 295},228`}
            fill="none"
            stroke={PASS}
            strokeWidth={2}
          />
          <text x={x + 240} y={300} textAnchor="middle" className={MONO} fontSize={11} fill={PASS}>
            clean edge
          </text>
        </>
      )}
    </g>
  );
  return (
    <>
      {panel(40, "what simulation sees", SLATE, false)}
      {panel(400, "what silicon does", DANGER, true)}
      <text x={380} y={355} textAnchor="middle" className={SANS} fontSize={15} fill={TEXT}>
        same RTL. one path the simulator is blind to.
      </text>
    </>
  );
}

/* 05 — A bus that hangs forever (deadlock). */
function DeadlockDiagram() {
  // Triangle: M0 top, M1 bottom-right, M2 bottom-left. Loop M0 -> M1 -> M2 -> M0.
  const nodes = [
    { id: "M0", x: 380, y: 110 },
    { id: "M1", x: 560, y: 290 },
    { id: "M2", x: 200, y: 290 },
  ];
  const arc = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;
    const r = 42;
    const x1 = a.x + ux * r;
    const y1 = a.y + uy * r;
    const x2 = b.x - ux * (r + 8);
    const y2 = b.y - uy * (r + 8);
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  };
  return (
    <>
      <text x={380} y={48} textAnchor="middle" className={MONO} fontSize={12} letterSpacing="2" fill={MUTED}>
        SHARED BUS ARBITER · 3 MASTERS
      </text>
      {[
        [nodes[0], nodes[1]],
        [nodes[1], nodes[2]],
        [nodes[2], nodes[0]],
      ].map(([a, b], i) => (
        <path
          key={i}
          d={arc(a, b)}
          fill="none"
          stroke={DANGER}
          strokeWidth={2.5}
          markerEnd="url(#ahRed)"
        />
      ))}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r={42} fill="#0b0d10" stroke={SLATE} strokeWidth={2} />
          <text x={n.x} y={n.y - 2} textAnchor="middle" className={MONO} fontSize={18} fill={WHITE}>
            {n.id}
          </text>
          <text x={n.x} y={n.y + 18} textAnchor="middle" className={MONO} fontSize={10} fill={MUTED}>
            holds · waits
          </text>
        </g>
      ))}
      <text x={380} y={372} textAnchor="middle" className={SANS} fontSize={16} fill={WHITE}>
        circular wait <tspan fill={DANGER}>→ bus frozen</tspan>
      </text>
    </>
  );
}

/* 03 — Spec-to-RTL drift. */
function DriftDiagram() {
  const bits = [1, 1, 1, 1, 1, 1, 1, 1];
  const cell = (x: number, on: boolean, bad: boolean) => (
    <g key={x}>
      <rect
        x={x}
        y={0}
        width={30}
        height={30}
        rx={3}
        fill="none"
        stroke={bad ? DANGER : PASS}
        strokeWidth={bad ? 2 : 1.5}
      />
      <text
        x={x + 15}
        y={21}
        textAnchor="middle"
        className={MONO}
        fontSize={15}
        fill={bad ? DANGER : PASS}
      >
        {on ? "1" : "0"}
      </text>
    </g>
  );
  const strip = (gx: number, gy: number, label: string, badIndex: number) => (
    <g transform={`translate(${gx} ${gy})`}>
      <text x={0} y={-12} className={MONO} fontSize={13} fill={MUTED}>{label}</text>
      {bits.map((b, i) => (
        <g key={i} transform={`translate(${i * 38} 0)`}>
          {cell(0, b === 1, i === badIndex)}
        </g>
      ))}
    </g>
  );
  return (
    <>
      <text x={40} y={48} className={MONO} fontSize={26} fontWeight={600} fill={WHITE}>
        ≈70%
      </text>
      <text x={150} y={48} className={SANS} fontSize={15} fill={MUTED}>
        of respins are design errors
      </text>

      {strip(60, 130, "spec   [63:38]", -1)}
      {strip(60, 220, "RTL    [63:39]", 5)}
      <line x1={60 + 5 * 38 + 15} y1={150} x2={60 + 5 * 38 + 15} y2={208} stroke={DANGER} strokeWidth={1.5} strokeDasharray="3 3" />
      <text x={60 + 5 * 38 + 60} y={196} className={MONO} fontSize={12} fill={DANGER}>one bit flipped</text>

      <text x={60} y={300} className={SANS} fontSize={16} fill={WHITE}>
        tests all green <tspan className={MONO} fill={PASS} fontSize={15}>✓</tspan>{" "}
        <tspan fill={MUTED}>— one wrong bit survives every test.</tspan>
      </text>
    </>
  );
}

/* 06 — The counter that never gives up (overflow). */
function OverflowDiagram() {
  const x0 = 60;
  const x255 = 470;
  const y = 200;
  const ticks = [0, 64, 128, 192, 255];
  return (
    <>
      <text x={60} y={70} className={MONO} fontSize={12} letterSpacing="1" fill={MUTED}>
        8-BIT RETRY COUNTER
      </text>
      {/* number line 0..255 */}
      <line x1={x0} y1={y} x2={x255} y2={y} stroke={SLATE} strokeWidth={2} />
      {ticks.map((t) => {
        const tx = x0 + (t / 255) * (x255 - x0);
        return (
          <g key={t}>
            <line x1={tx} y1={y - 6} x2={tx} y2={y + 6} stroke={SLATE} strokeWidth={1.5} />
            <text x={tx} y={y + 26} textAnchor="middle" className={MONO} fontSize={12} fill={MUTED}>{t}</text>
          </g>
        );
      })}
      {/* counter pinned at 255 */}
      <circle cx={x255} cy={y} r={7} fill={DANGER} />
      <text x={x255} y={y - 18} textAnchor="middle" className={MONO} fontSize={12} fill={DANGER}>pinned</text>
      {/* dashed unreachable gap */}
      <line x1={x255 + 8} y1={y} x2={640} y2={y} stroke={DANGER} strokeWidth={1.5} strokeDasharray="5 5" />
      <text x={x255 + 60} y={y - 16} className={MONO} fontSize={11} fill={MUTED}>can never reach</text>
      {/* 16-bit limit marker */}
      <line x1={668} y1={y - 30} x2={668} y2={y + 30} stroke={DANGER} strokeWidth={2} />
      <text x={668} y={y - 40} textAnchor="middle" className={MONO} fontSize={13} fill={DANGER}>limit = 1000</text>
      <text x={668} y={y + 50} textAnchor="middle" className={MONO} fontSize={11} fill={MUTED}>(16-bit)</text>

      <text x={60} y={330} className={SANS} fontSize={16} fill={WHITE}>
        give-up condition never fires <tspan fill={DANGER}>→ retries forever</tspan>
      </text>
    </>
  );
}

/* 07 — Counted twice (I2C fall time). */
function I2cDiagram() {
  const yTop = 150;
  const yBot = 250;
  // SCL: high, fall, long-low (correct low + extra t_f), rise, high
  const lowStart = 230;
  const correctLowEnd = 430;
  const buggyLowEnd = 500; // one extra t_f
  return (
    <>
      <text x={60} y={70} className={MONO} fontSize={12} letterSpacing="1" fill={MUTED}>
        SCL LOW PERIOD
      </text>
      {/* correct low region outline (green) */}
      <rect x={lowStart} y={yBot} width={correctLowEnd - lowStart} height={yTop - yBot} fill={PASS} opacity={0.08} />
      {/* extra slice (red) */}
      <rect x={correctLowEnd} y={yBot} width={buggyLowEnd - correctLowEnd} height={yTop - yBot} fill={DANGER} opacity={0.22} />

      {/* SCL waveform held low to buggyLowEnd */}
      <polyline
        points={`120,${yTop} ${lowStart},${yTop} ${lowStart},${yBot} ${buggyLowEnd},${yBot} ${buggyLowEnd},${yTop} 640,${yTop}`}
        fill="none"
        stroke={WHITE}
        strokeWidth={2}
      />
      {/* spec-correct rise (green, dashed) where it should have ended */}
      <line x1={correctLowEnd} y1={yBot} x2={correctLowEnd} y2={yTop} stroke={PASS} strokeWidth={1.5} strokeDasharray="4 3" />

      <text x={(lowStart + correctLowEnd) / 2} y={yBot + 26} textAnchor="middle" className={MONO} fontSize={12} fill={PASS}>t_low + t_f</text>
      <text x={(correctLowEnd + buggyLowEnd) / 2} y={yBot + 26} textAnchor="middle" className={MONO} fontSize={12} fill={DANGER}>+ t_f</text>
      <text x={120} y={yTop - 14} className={MONO} fontSize={12} fill={MUTED}>SCL</text>

      <text x={60} y={335} className={SANS} fontSize={16} fill={WHITE}>
        fall time <tspan fill={DANGER}>added twice</tspan> — clock held low one t_f too long, every cycle
      </text>
    </>
  );
}

/* 01 — Right proof for each bug (method map). */
function ProofMapDiagram() {
  const methods = [
    { id: "formal", t: "formal", y: 110 },
    { id: "sim", t: "simulation", y: 200 },
    { id: "struct", t: "structural", y: 290 },
  ];
  const classes = [
    { t: "bit-field / off-by-one", y: 95, to: "formal" },
    { t: "missing increment", y: 150, to: "formal" },
    { t: "protocol timing", y: 205, to: "sim" },
    { t: "clock-domain crossing", y: 290, to: "struct" },
  ];
  const mx = 470;
  const cx = 250;
  const my = (id: string) => methods.find((m) => m.id === id)!.y;
  return (
    <>
      <text x={40} y={50} className={MONO} fontSize={12} letterSpacing="2" fill={MUTED}>
        MATCH THE PROOF TO THE BUG
      </text>
      {classes.map((c) => (
        <g key={c.t}>
          <line x1={cx} y1={c.y} x2={mx - 6} y2={my(c.to)} stroke={SLATE} strokeWidth={1.5} markerEnd="url(#ahSlate)" />
          <text x={cx - 12} y={c.y + 4} textAnchor="end" className={MONO} fontSize={13} fill={TEXT}>{c.t}</text>
        </g>
      ))}
      {methods.map((m) => (
        <g key={m.id}>
          <rect x={mx} y={m.y - 22} width={210} height={40} rx={6} fill="none" stroke={ACCENT} strokeWidth={1.5} />
          <text x={mx + 105} y={m.y + 4} textAnchor="middle" className={MONO} fontSize={15} fill={ACCENT}>{m.t}</text>
        </g>
      ))}
      <text x={40} y={360} className={SANS} fontSize={15} fill={MUTED}>
        one technique alone is blind to the classes the other two were built for.
      </text>
    </>
  );
}

type Diagram = { label: string; desc: string; body: ReactNode };

const DIAGRAMS: Record<string, Diagram> = {
  "04-one-missing-plus-one-aes": {
    label: "AES counter-mode bug",
    desc: "Shipped counter stays 0 0 0 0 (keystream reused, red) while the spec counter increments 0 1 2 3 (green); synthesis, vectors and coverage all pass, but secure fails. All green, still broken.",
    body: <AesDiagram />,
  },
  "02-bug-your-simulator-cannot-see": {
    label: "Clock-domain crossing blind spot",
    desc: "Two panels of the same cross-clock signal: simulation sees a clean sampled edge; silicon shows a metastable glitch in the crossing gap, marked as the simulator's blind spot.",
    body: <CdcDiagram />,
  },
  "05-a-bus-that-hangs-forever": {
    label: "Three-way bus deadlock",
    desc: "Three masters M0, M1, M2 in a triangle, each holding a resource and waiting on the next, with three red arrows forming a closed loop: circular wait freezes the bus.",
    body: <DeadlockDiagram />,
  },
  "03-spec-to-rtl-drift": {
    label: "Spec-to-RTL drift, one bit",
    desc: "A spec bit strip [63:38] and an RTL bit strip [63:39] side by side; one bit is flipped red in the RTL while every test stays green. About 70% of respins are design errors.",
    body: <DriftDiagram />,
  },
  "06-the-counter-that-never-gives-up": {
    label: "8-bit counter versus a 16-bit limit",
    desc: "A 0 to 255 number line with the retry counter pinned at 255 in red, and a far 16-bit limit of 1000 it can never reach, so the give-up condition never fires and the logic retries forever.",
    body: <OverflowDiagram />,
  },
  "07-counted-twice-i2c-fall-time": {
    label: "I2C fall time counted twice",
    desc: "An SCL clock waveform held low one extra fall-time per cycle; the correct low period t_low + t_f is outlined green and the extra t_f slice is shaded red.",
    body: <I2cDiagram />,
  },
  "01-right-proof-for-each-rtl-bug": {
    label: "Match the proof to the bug",
    desc: "A map routing bug classes to the method that catches each: bit-field and off-by-one and missing increment to formal, protocol timing to simulation, clock-domain crossing to structural.",
    body: <ProofMapDiagram />,
  },
};

export function HeroDiagram({ slug }: { slug: string }) {
  const d = DIAGRAMS[slug];
  if (!d) return null;
  return (
    <Frame label={d.label} desc={d.desc}>
      {d.body}
    </Frame>
  );
}
