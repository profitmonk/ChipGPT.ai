// ChipGPT RTL/DV demo — recording-grade 3-panel replay. Vanilla JS, no build step.
"use strict";

const $ = (id) => document.getElementById(id);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const KIND_LABEL = {
  note: "·", read_spec: "SPEC", scan_rtl: "RTL", locate: "FIND",
  generate_sva: "SVA", directed_test: "TEST", bug_card: "CARD", traceability: "TRACE",
};

let state = { trace: null, runId: 0, playing: false, speed: 1, live: false, bugId: null };

// ---------- lock the 1920x1080 stage, scale to fit the window ----------
function fitStage() {
  const s = $("stage");
  if (!s) return;
  const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
  s.style.transform = `scale(${scale})`;
}

// ---------- syntax highlighting ----------
const SV_KW = new Set(("module endmodule input output inout logic reg wire assign always always_ff always_comb " +
  "posedge negedge begin end if else case endcase default for parameter localparam typedef struct enum " +
  "package import function endfunction task endtask generate endgenerate assert property disable iff").split(" "));
const SV_TYPE = new Set(["logic", "bit", "byte", "int", "integer", "longint", "shortint", "reg", "wire"]);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function svHighlight(line) {
  const ci = line.indexOf("//");
  let code = line, comment = "";
  if (ci >= 0) { code = line.slice(0, ci); comment = line.slice(ci); }
  // tokenize code part
  let out = "";
  const re = /(\b\d+'[bhdo][0-9a-fA-F_xzXZ]+|\b\d+\b)|([A-Za-z_]\w*)|([^\sA-Za-z0-9_]+)|(\s+)/g;
  let m;
  while ((m = re.exec(code)) !== null) {
    if (m[1]) out += `<span class="t-num">${esc(m[1])}</span>`;
    else if (m[2]) {
      const w = m[2];
      if (SV_KW.has(w)) out += `<span class="${SV_TYPE.has(w) ? "t-type" : "t-kw"}">${esc(w)}</span>`;
      else out += esc(w);
    } else if (m[3]) out += `<span class="t-op">${esc(m[3])}</span>`;
    else out += esc(m[4]);
  }
  if (comment) out += `<span class="t-com">${esc(comment)}</span>`;
  return out || "&nbsp;";
}

function specStyle(line) {
  if (/^\s*#/.test(line)) return `<span class="sp-h">${esc(line.replace(/^#+\s*/, ""))}</span>`;
  let cls = "", body = line;
  if (/^\s*>/.test(line)) { cls = "sp-quote"; body = line.replace(/^\s*>\s?/, ""); }
  body = esc(body)
    .replace(/\*\*(.+?)\*\*/g, '<span class="sp-b">$1</span>')
    .replace(/`(.+?)`/g, '<span class="sp-code">$1</span>');
  if (cls === "sp-quote") body = `<span class="sp-q">${body}</span>`;
  return { html: body || "&nbsp;", cls };
}

// ---------- data load ----------
async function loadBugs() {
  const bugs = await (await fetch("/coworker/bugs.json")).json();
  const sel = $("bugSelect");
  sel.innerHTML = "";
  bugs.forEach((b) => {
    const o = document.createElement("option");
    o.value = b.bug_id; o.textContent = b.title; sel.appendChild(o);
  });
  buildLanding(bugs);
  if (bugs.length) await selectBug(bugs[0].bug_id);   // preload behind the landing
}

const METHOD_ICON = { Formal: "∀", Simulation: "▶", Structural: "⧉" };

function buildLanding(bugs) {
  const wrap = $("bugCards");
  wrap.innerHTML = "";
  bugs.forEach((b) => {
    const card = document.createElement("button");
    card.className = "bug-card-btn";
    const methods = (b.proof && b.proof.methods) || [];
    const chips = methods.map((m) =>
      `<span class="proof-chip ${m.toLowerCase()}">${METHOD_ICON[m] || "✓"} ${m}</span>`).join("");
    card.innerHTML = `
      <div class="bc-title">${esc(b.title)}</div>
      <div class="bc-tag">${esc(b.tagline || "")}</div>
      <div class="bc-methods">${chips}</div>
      <div class="bc-run">▶ Run the co-worker</div>`;
    card.addEventListener("click", async () => {
      $("bugSelect").value = b.bug_id;
      await selectBug(b.bug_id);
      play();                       // play() hides the landing
    });
    wrap.appendChild(card);
  });
}

async function selectBug(bugId) {
  stop();
  state.bugId = bugId;
  const base = `/coworker/bugs/${bugId}`;
  // live mode loads trace.live.json; fall back to curated if it doesn't exist.
  const wanted = state.live ? "trace.live.json" : "trace.json";
  let resp = await fetch(`${base}/${wanted}`);
  if (!resp.ok && state.live) {
    state.live = false; updateLiveBtn();
    resp = await fetch(`${base}/trace.json`);
  }
  const trace = await resp.json();
  const [specTxt, rtlTxt] = await Promise.all([
    fetch(`${base}/${trace.spec_panel.path}`).then((r) => r.text()),
    fetch(`${base}/${trace.rtl_panel.path}`).then((r) => r.text()),
  ]);
  state.trace = trace;

  $("specTitle").textContent = trace.spec_panel.title;
  $("rtlTitle").textContent = trace.rtl_panel.title;
  $("hook").textContent = trace.hook_30s;
  renderProof(trace.proof);
  $("tokNote").textContent = trace.captured_live ? "● live" : "cached · 0 tokens";
  $("srcLink").innerHTML = `${esc(trace.category)} &nbsp;·&nbsp; ${trace.cwe_ids.join(", ")} &nbsp;·&nbsp; <a href="${trace.source_url}" target="_blank">${esc(trace.source_url)}</a>`;

  renderCode("specCode", specTxt.replace(/\n$/, "").split("\n"), "spec");
  renderCode("rtlCode", rtlTxt.replace(/\n$/, "").split("\n"), "sv");
  resetStage();
}

function renderProof(proof) {
  const el = $("proof");
  el.innerHTML = "";
  if (!proof || !proof.methods) return;
  const ICON = { Formal: "∀", Simulation: "▶", Structural: "⧉" };
  proof.methods.forEach((m) => {
    const chip = document.createElement("span");
    chip.className = "proof-chip " + m.toLowerCase();
    chip.textContent = `${ICON[m] || "✓"} ${m}`;
    el.appendChild(chip);
  });
  if (proof.note) el.title = proof.note;
}

function renderCode(elId, lines, mode) {
  const el = $(elId);
  el.className = "code";
  el.innerHTML = "";
  lines.forEach((src, i) => {
    const ln = document.createElement("div");
    ln.id = `${elId}-l${i + 1}`;
    let inner;
    if (mode === "sv") { ln.className = "ln"; inner = svHighlight(src); }
    else { const s = specStyle(src); ln.className = "ln " + (s.cls || ""); inner = s.html; }
    ln.innerHTML = `<span class="gutter">${i + 1}</span><span class="src">${inner}</span>`;
    el.appendChild(ln);
  });
}

function resetStage() {
  $("transcript").innerHTML = "";
  $("artifactRail").innerHTML = "";
  $("progressFill").style.width = "0%";
  $("bugBadge").classList.remove("show");
  clearHighlights();
}

function clearHighlights() {
  document.querySelectorAll(".ln.hl, .ln.spec-hl, .ln.bug").forEach((e) =>
    e.classList.remove("hl", "spec-hl", "bug"));
  $("specCode").classList.remove("spotlight");
  $("rtlCode").classList.remove("spotlight");
}

function highlight(elId, nums, cls) {
  if (!nums || !nums.length) return;
  $(elId).classList.add("spotlight");
  nums.forEach((n) => {
    const ln = $(`${elId}-l${n}`);
    if (ln) { ln.classList.add(cls); ln.scrollIntoView({ block: "center", behavior: "smooth" }); }
  });
}

// ---------- transcript w/ typewriter ----------
async function addTranscript(step, myRun) {
  if (!step.agent) return;
  const div = document.createElement("div");
  div.className = `tline ${step.kind}`;
  div.innerHTML = `<span class="k">${KIND_LABEL[step.kind] || "·"}</span><span class="txt"></span>`;
  const txt = div.querySelector(".txt");
  $("transcript").appendChild(div);

  const fast = state.speed >= 4;
  if (fast) { txt.textContent = step.agent; $("transcript").scrollTop = 1e9; return; }
  const cur = document.createElement("span"); cur.className = "cursor";
  div.appendChild(cur);
  const chars = step.agent.split("");
  const per = Math.max(4, Math.min(16, 900 / chars.length)) / state.speed;
  for (let i = 0; i < chars.length; i++) {
    if (myRun !== state.runId) { txt.textContent = step.agent; break; }
    txt.textContent += chars[i];
    $("transcript").scrollTop = 1e9;
    if (i % 2 === 0) await sleep(per);
  }
  cur.remove();
}

// ---------- artifacts ----------
function renderArtifact(a) {
  const rail = $("artifactRail");
  const card = document.createElement("div");
  card.className = "card";
  if (a.type === "sva") {
    card.innerHTML = `<h4>⚡ Generated assertion · ${esc(a.spec_section || "")}</h4>`;
    const pre = document.createElement("pre"); pre.textContent = a.sva; card.appendChild(pre);
    if (a.result) { const r = document.createElement("div"); r.className = "fail"; r.textContent = a.result; card.appendChild(r); }
  } else if (a.type === "directed_test") {
    card.innerHTML = `<h4>▶ Directed test · ${esc(a.name)}</h4>`;
    if (a.stimulus) { const s = document.createElement("pre"); s.style.color = "var(--dim)"; s.textContent = a.stimulus; card.appendChild(s); }
    add(card, "div", "fail", "buggy RTL:  " + a.result_on_buggy);
    add(card, "div", "pass", "fixed RTL:  " + a.result_on_fixed);
  } else if (a.type === "bug_card") {
    card.className = "card bug";
    card.innerHTML = `<h4>Bug card</h4>`;
    row(card, "", `<b style="font-size:14px">${esc(a.title)}</b>`);
    row(card, "cwe", `${(a.cwe_ids || []).join(", ")} · ${esc(a.category)}`);
    row(card, "root cause", esc(a.root_cause));
    row(card, "fix", `<span class="sp-code">${esc(a.fix)}</span>`);
    row(card, "impact", esc(a.impact));
    if (a.why_agent_wins) row(card, "why the agent wins", esc(a.why_agent_wins));
  } else if (a.type === "traceability") {
    card.innerHTML = `<h4>↳ Traceability row</h4>`;
    const chain = document.createElement("div"); chain.className = "chain";
    [a.spec_section, a.rtl_location, a.test].forEach((n, i) => {
      if (i) { const ar = document.createElement("span"); ar.className = "arr"; ar.textContent = "→"; chain.appendChild(ar); }
      const node = document.createElement("span"); node.className = "node"; node.textContent = n; chain.appendChild(node);
    });
    card.appendChild(chain);
    row(card, "coverage", a.coverage_status);
  }
  rail.appendChild(card);
  rail.scrollLeft = rail.scrollWidth;
}
function add(parent, tag, cls, text) { const e = document.createElement(tag); e.className = cls; e.textContent = text; parent.appendChild(e); }
function row(card, key, html) { const d = document.createElement("div"); d.className = "row"; d.innerHTML = key ? `<span class="kv">${key}</span>${html}` : html; card.appendChild(d); }

// ---------- play loop ----------
async function play() {
  if (state.playing || !state.trace) return;
  $("intro").classList.add("hide");
  const myRun = ++state.runId;
  state.playing = true; $("playBtn").textContent = "⏸ Pause";
  state.speed = parseFloat($("speedSelect").value);
  resetStage();

  const steps = state.trace.steps;
  let prevT = 0;
  for (let i = 0; i < steps.length; i++) {
    if (myRun !== state.runId) return;
    const step = steps[i];
    const wait = Math.min(Math.max(0, (step.t - prevT) / state.speed), 5) * 1000;
    await sleep(wait);
    if (myRun !== state.runId) return;
    prevT = step.t;

    clearHighlights();
    highlight("specCode", step.spec_highlight, "spec-hl");
    if (step.kind === "locate") {
      highlight("rtlCode", step.rtl_highlight, "bug");
      $("bugBadge").classList.add("show");
    } else {
      highlight("rtlCode", step.rtl_highlight, "hl");
    }
    await addTranscript(step, myRun);
    if (step.artifact) renderArtifact(step.artifact);
    $("progressFill").style.width = `${Math.round(((i + 1) / steps.length) * 100)}%`;
  }
  state.playing = false; $("playBtn").textContent = "▶ Replay";
}

function stop() { state.runId++; state.playing = false; const b = $("playBtn"); if (b) b.textContent = "▶ Play"; }
function restart() { stop(); play(); }

function updateLiveBtn() {
  const b = $("liveBtn");
  b.classList.toggle("on", state.live);
  b.textContent = state.live ? "⚡ Live ON" : "⚡ Live";
}
function toggleLive() {
  state.live = !state.live;
  updateLiveBtn();
  if (state.bugId) selectBug(state.bugId);
}

// ---------- wire up ----------
window.addEventListener("DOMContentLoaded", () => {
  $("bugSelect").addEventListener("change", (e) => selectBug(e.target.value));
  $("playBtn").addEventListener("click", () => (state.playing ? stop() : play()));
  $("restartBtn").addEventListener("click", restart);
  $("liveBtn").addEventListener("click", toggleLive);
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") { e.preventDefault(); state.playing ? stop() : play(); }
    else if (e.key.toLowerCase() === "r") restart();
  });
  fitStage();
  window.addEventListener("resize", fitStage);
  loadBugs();
});
