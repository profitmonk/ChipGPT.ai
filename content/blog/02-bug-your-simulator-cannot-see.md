---
title: "The Bug Your Simulator Literally Cannot See"
description: "A clock-domain-crossing bug passes every simulation, every assertion, and full coverage, then shows up in the lab. Here is why simulation is physically blind to it, and the kind of check that actually catches it."
date: "2026-06-16"
---

You can run a hardware design through a million simulation cycles, reach full coverage, watch every assertion pass, and still ship a chip that looks correct and then fails on a lab bench. For one family of bugs this is not a testing gap you can close by writing more tests. The simulator cannot represent the failure at all.

That family is the clock-domain crossing. The reason simulation misses it is physical, not a matter of effort, so it is worth building up from the start.

## Where this sits in the chip flow

A chip travels a long pipeline. It starts as a written spec. Engineers turn that into RTL, which is the human-written Verilog or SystemVerilog code that describes the chip's logic. The RTL goes through verification, then synthesis (which turns the code into a netlist of real logic gates), then physical design, and finally becomes a GDSII file, the layout the factory uses to make the chip. Sending that file to the factory is called tapeout.

Most verification effort lives in simulation: you drive inputs into the RTL and check the outputs. Clock-domain bugs are born in the RTL. If simulation misses them, they do not surface until much later, in a slow gate-level run with real timing or in actual silicon. That lateness is the whole problem, and it traces back to one physical effect.

## What a clock domain is, and why crossings are dangerous

A clock is the heartbeat of digital logic, a signal that ticks up and down and tells every flip-flop when to capture its input. A flip-flop is a one-bit memory: on each clock tick it grabs whatever is on its input and holds it until the next tick.

Big chips do not run on a single clock. A processor core, a memory interface, and a radio block each run at their own speed, so the design has several clock domains, each being a region governed by its own clock. When two clocks are not derived from the same source, they are asynchronous: their ticks drift relative to each other with no fixed relationship.

Now take a signal produced by logic in clock domain A and feed it into a flip-flop in clock domain B. Because the two clocks drift, sooner or later domain B will tick at the exact instant the signal is changing from 0 to 1. The flip-flop is caught mid-transition. It goes metastable, which means for a short window its output is neither a clean 0 nor a clean 1. It hovers at an undefined level and settles to one or the other unpredictably. Two gates reading that output can resolve it differently, and now the two halves of your chip disagree about what happened.

Miss a single crossing and you have a latent failure whose appearance depends on temperature, voltage, and plain luck. It might work on a thousand chips and hang on the next.

The fix is well understood. Never let a raw cross-domain signal fan out into the logic. For a single bit, pass it through a two-flop synchronizer, two flip-flops back to back that give a metastable value a full clock cycle to settle before anything downstream uses it. For multi-bit data, use a proper handshake or an asynchronous FIFO, a small buffer designed to move data safely between two clocks. Get one crossing wrong and the protection is simply absent on that path.

## Why simulation is blind

RTL simulation models time in a simplified way. Signals settle instantly, and on every clock tick each flip-flop sees a clean, fully resolved 0 or 1. Metastability, the entire failure mechanism, does not exist in that model. The sample always lands cleanly.

So a missing synchronizer simulates exactly like a present one. The waveform looks identical. The test passes, coverage goes green, and the bug is invisible, not because you tested too little but because the thing that breaks is a physical timing effect the simulator was never built to show.

It stays invisible until gate-level simulation with back-annotated timing, which is a later and much slower run that does model real gate delays, or until a finished chip fails one board in fifty at the wrong temperature. By then a tapeout has already been paid for.

## Why assertions and coverage do not save you

The natural reaction is "we will write an assertion for it." An assertion is a formal statement of a rule the design must always obey, checked automatically. The catch is that a functional assertion runs in the same instant-settling model, so it cannot observe metastability either. Coverage has the same limit. It tells you a line of logic was exercised, not whether that line is structurally safe across clocks. You can hold full coverage of a crossing that is fundamentally unsafe.

This is the trap. A sign-off story of "simulation clean, assertions pass, coverage closed" can be completely true while an unsynchronized crossing sails through underneath it.

## A real example

This is not a thought experiment. In OpenTitan, an open-source secure chip that serves as a root of trust (the hardware anchor the rest of a system's security is built on), the life-cycle controller connected to the KMAC cryptographic block across two clock domains without proper synchronization. The lineage of that issue is public ([lowRISC/opentitan #20979](https://github.com/lowRISC/opentitan/issues/20979)). It was caught in gate-level simulation, after it had already passed RTL simulation. On a less rigorous project it reaches the lab.

## What actually catches it: structural analysis

This bug is found by analyzing the structure of the design rather than its simulated behavior. The idea is simple to state. Enumerate every clock domain in the module. Trace every signal that crosses from one domain to another. For each crossing, check whether a recognized synchronizer or handshake sits on the path. Flag the crossings that do not have one.

No stimulus, no waveform, just a static walk of the design's clock topology. It is a different category of verification from simulation and from functional formal checking, and it is the only one that sees this class of bug.

## Why even dedicated CDC tools can miss it

Teams are not defenseless here. The major EDA vendors (EDA is electronic design automation, the commercial tooling for chip design) sell clock-domain-crossing checkers that do exactly this structural walk, and lint tools add another layer. They are real and they work. So why do crossings still reach gate-level simulation and silicon?

Because a structural checker is only as good as the information a human feeds it. To analyze crossings, the tool first needs every clock and reset declared, and it needs an engineer to tell it which paths are intentionally safe. That setup is where the gaps open.

**Waivers bury the real one.** A clock-domain run on a full chip can produce thousands of warnings. Teams waive them in bulk to reach a clean report, and a genuine bug gets waived alongside the false ones. Declare one asynchronous clock as synchronous, or write one wrong waiver, and the tool certifies an unsafe path as safe.

**Intent is invisible to a structural tool.** Some signals are safe to cross without a synchronizer because the spec guarantees they are quasi-static, meaning they only change while the receiver is idle, for example a configuration value written once before a block is switched on. The tool has no access to the spec, so a human has to encode that intent as a constraint. If the spec assumption is wrong, or the RTL quietly violates it, the tool is blind to the gap. It will also flag the genuinely safe signals as noise, which feeds the waiver problem above.

**Unusual structures get misread.** The checker matches known synchronizer patterns. A hand-rolled or oddly coded synchronizer can be accepted when it is actually wrong.

So the escape is not mysterious. A structure-only tool, driven by imperfect human setup, signs off a path that is actually unsafe. It then shows up in gate-level simulation, the slower run that uses real timing. There an unsynchronized crossing can appear as an X, an unknown value that spreads through the logic and makes a downstream check fail intermittently. Gate-level simulation is simply the first model rich enough to expose what the structural sign-off waived away. If that run does not happen to hit the case, the lab does.

## Why the co-worker helps: it reads the spec, not just the wiring

Here is the difference that matters. A pure structural checker sees only how the RTL is wired. The ChipGPT co-worker reads the spec and the RTL together, so it reasons about what the design is meant to do, not only how it is connected. That changes the check in ways a structure-only flow cannot reach.

**It works from intent, not just structure.** Because it has the spec, it can tell a genuinely quasi-static configuration signal from one the spec never promised would hold still. A structure-only tool leans on a human to encode that distinction as a constraint, which is the exact step that fails. Reading the spec lets the co-worker flag the real gap and stay quiet on the safe path, instead of generating the thousand-line report that leads to the bulk waivers in the first place.

**It remembers across designs.** The co-worker carries the patterns of designs it has seen before. When a new crossing has the same shape as one that caused a failure on a past program, it says so, even when every signal has been renamed. A first-time mistake on your chip is rarely a first-time mistake in the world, and the co-worker treats it that way. That is the value of a memory that spans designs: each chip you check makes the next one safer.

**It grounds its judgment in context.** It draws on what is actually known about the design, the spec, the intent recorded in design discussions and reviews, and the prior designs it has seen, rather than the single file in front of it. That context is what separates a flat "this is an unsynchronized crossing" from "this crossing carries a signal the spec says must be synchronized, and one shaped like it bit an earlier chip."

**It runs early.** All of this happens at the RTL stage, in the same loop that reads your spec, while the code is still being written. Not a separate heavyweight tool configured near tapeout, and not an overnight gate-level run. It points at the specific unsynchronized signal, explains why it is unsafe against the spec, and does it in your own environment, with your RTL never leaving it. On a small team or an open project, where a full clock-domain sign-off often runs once at the end or gets skipped, that is the difference between catching the crossing and shipping it.

If your confidence rests on "simulation clean, assertions pass, coverage closed," you are leaning on three checks that share one blind spot, and even a late structural sign-off can waive the bug away on top of them. The crossing is still there. The teams that ship clean first silicon treat structural clock-domain analysis as its own gate, run it against the spec's intent, and learn from every design that came before.

> See the ChipGPT co-worker catch a real clock-domain bug a simulator passes, live, on an open-source secure core: **[chipgpt.ai/coworker](https://chipgpt.ai/coworker)**
