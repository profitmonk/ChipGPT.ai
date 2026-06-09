---
title: "Formal, Simulation, or Structural? Choosing the Right Proof for Each RTL Bug"
description: "Most respins trace to known bug classes. What separates teams that catch them is matching the right verification method to each bug — formal, simulation, or structural."
date: "2026-06-09"
---

First-silicon success has fallen to around 14% — the lowest in two decades of Wilson Research / Siemens EDA tracking. Most of those respins aren't exotic. They trace back to bugs that were sitting in the RTL the whole time, in classes we have known about for years. What separates the teams that catch them from the teams that tape them out is rarely *more* verification effort. It's applying the **right kind** of verification to each bug.

There are three, and most "AI finds bugs" pitches blur them together. They shouldn't. Knowing which one a given bug needs is the actual skill.

## 1. Formal — proof over every input

Formal model checking asks a solver to find *any* input, over all of time (or up to a bound), that violates a property. If none exists, the property is proven; if one does, you get a concrete counterexample. It shines on bugs you can state as an assertion and whose logic doesn't explode in state:

- **Combinational and bit-level errors.** Consider the CVA6 RISC-V core's Sv39 address check ([issue #136](https://github.com/openhwgroup/cva6/issues/136)). The spec requires the top address bits `[63:38]` to all match bit 38; the RTL checked `[63:39]` — off by one, excluding the sign bit, a virtual-memory protection bypass. A solver settles this exhaustively: it either proves the check is spec-correct or hands you the exact non-canonical address that slips through. No test vector has to guess the corner.
- **Missing increments and arithmetic.** An AES counter-mode block that never increments its counter ([Hack@DAC 2021](https://github.com/HACK-EVENT/hackatdac21), CWE-1240) reduces to a one-line property: after a block completes, the counter must change. Formal disproves it instantly.

The limit is real: large sequential designs blow up the state space, and the property has to be expressible. But for the decode-and-bit-field bugs that quietly cause respins, formal is the sharpest tool you have.

## 2. Simulation — reproduce it with a stimulus

Simulation runs the design with specific inputs and watches the output. It's the right call when the property is awkward to state formally, needs a reference model, or is naturally a timing/protocol behavior:

- **Protocol timing.** An I2C controller that double-counts the bus fall time when computing the SCL-low period ([OpenTitan #18492](https://github.com/lowRISC/opentitan/issues/18492)) holds the clock low one fall-time too long every cycle. The cleanest proof is a directed test that drives the timing inputs and measures the resulting period against the spec model — which is exactly how the real fix shipped, with a paired device-interface test.

Simulation's strength is that it's concrete and intuitive: the test fails on the bug and passes on the fix. Its weakness is equally important — **you only catch what you stimulate.** The bug has to be reachable by the vectors you wrote.

## 3. Structural — the bugs neither sim nor formal will show you

Here's the one most pitches miss entirely. Some bugs aren't a functional property at all; they live in the *structure* of the design — clock domains, reset trees, connectivity.

The canonical example is a clock-domain crossing without a synchronizer — for instance, a life-cycle controller feeding a crypto block across two clocks with no two-flop synchronizer in between. Run it in RTL simulation and **it passes.** Run it a thousand times and it passes every time. Zero-delay RTL simulation cannot model metastability, and it isn't a functional property a solver evaluates either. The only way to find it before silicon is to analyze the design's clock-domain structure directly — trace every cross-domain signal and flag the ones without a synchronizer.

This is why "we have 100% functional coverage" and "all our assertions pass" can both be true while a CDC bug sails through to gate-level simulation or, worse, to the lab.

## The skill is choosing — and a real bug often needs more than one

| If the bug is… | Reach for… |
|---|---|
| combinational / bit-level / a missing default | **Formal** |
| reachable by a stimulus; needs a reference model; protocol timing | **Simulation** |
| a clock-domain / reset / connectivity issue | **Structural** |
| a deadlock / fairness property | **Formal** (bounded) + a watchdog sim |

A shared-bus deadlock ([lowRISC three-way Wishbone](https://github.com/lowRISC/lowrisc-chip/issues/67)) is a liveness-class bug: three masters wait on each other in a circle and the bus hangs forever. Random tests almost never hit it. Bounded model checking produces a concrete starvation trace, and a watchdog simulation confirms the hang — two methods, one bug.

The honest takeaway isn't "formal beats simulation" or vice versa. It's that a verification flow which leans on one technique will systematically miss the bug classes the other two were built for. The teams shipping clean first silicon are the ones matching the proof to the bug — every time.

---

*This is the principle behind the ChipGPT RTL/DV co-worker: it reads your spec and your RTL, identifies the bug, and proves it the right way — on your hardware, with your LLM, your RTL never leaving.*
