---
title: "Formal, Simulation, or Structural? Choosing the Right Proof for Each RTL Bug"
description: "Most respins trace to known bug classes. What separates teams that catch them is matching the right verification method to each bug: formal, simulation, or structural."
date: "2026-06-09"
---

First-silicon success has fallen to around 14%, the lowest in two decades of Wilson Research and Siemens EDA tracking. First-silicon success means the very first manufactured chip works well enough to ship, and when it fails the team needs a respin, a re-manufacturing run with new photomasks that costs months. Most of those respins are not exotic. They trace back to bugs that were sitting in the RTL the whole time, in classes the industry has known about for years. RTL is the human-written Verilog or SystemVerilog code that describes the chip's logic. What separates the teams that catch these bugs from the teams that tape them out is rarely more verification effort. It is applying the right kind of verification to each bug.

There are three kinds, and most "AI finds bugs" pitches blur them together. They should not, because knowing which one a given bug needs is the actual skill.

## 1. Formal: proof over every input

Formal model checking asks a solver to find any input, over all of time or up to a bound, that violates a stated property. If none exists, the property is proven. If one does, you get a concrete counterexample, a specific input that breaks it. Formal shines on bugs you can state as a rule and whose logic does not explode in size.

- **Combinational and bit-level errors.** Consider the CVA6 RISC-V core's Sv39 address check ([openhwgroup/cva6 #136](https://github.com/openhwgroup/cva6/issues/136)). Sv39 is the rule for which memory addresses are legal, and it requires the top address bits [63:38] to all match bit 38. The RTL checked [63:39], off by one, excluding the sign bit, which is a virtual-memory protection bypass. A solver settles this exhaustively. It either proves the check is spec-correct or hands you the exact illegal address that slips through. No test vector has to guess the corner.
- **Missing increments and arithmetic.** An AES counter-mode block that never increments its counter ([Hack@DAC 2021](https://github.com/HACK-EVENT/hackatdac21), CWE-1240, a bug-class identifier from the public Common Weakness Enumeration) reduces to a one-line rule: after a block completes, the counter must change. Formal disproves it instantly.

The limit is real. Large sequential designs blow up the state space, and the rule has to be expressible. But for the decode and bit-field bugs that quietly cause respins, formal is the sharpest tool you have.

## 2. Simulation: reproduce it with a stimulus

Simulation runs the design with specific inputs and watches the output. It is the right call when the property is awkward to state formally, needs a reference model, or is naturally a timing or protocol behavior.

- **Protocol timing.** An I2C controller that double-counts the bus fall time when computing the SCL-low period ([lowRISC/opentitan #18492](https://github.com/lowRISC/opentitan/issues/18492)) holds the clock low one fall-time too long every cycle. The cleanest proof is a directed test that drives the timing inputs and measures the resulting period against the spec model, which is exactly how the real fix shipped, with a paired device-interface test.

Simulation's strength is that it is concrete and intuitive. The test fails on the bug and passes on the fix. Its weakness is equally important: you only catch what you stimulate. The bug has to be reachable by the vectors you wrote.

## 3. Structural: the bugs neither sim nor formal will show you

Here is the one most pitches miss entirely. Some bugs are not a functional property at all. They live in the structure of the design: clock domains, reset trees, connectivity.

The canonical example is a clock-domain crossing without a synchronizer, for instance a life-cycle controller feeding a crypto block across two clocks with no two-flop synchronizer in between. Run it in RTL simulation and it passes. Run it a thousand times and it passes every time. Zero-delay RTL simulation cannot model metastability, the physical effect where a flip-flop caught mid-transition outputs neither a clean 0 nor 1, and it is not a functional property a solver evaluates either. The only way to find it before silicon is to analyze the design's clock-domain structure directly, tracing every cross-domain signal and flagging the ones without a synchronizer.

This is why "we have 100% functional coverage" and "all our assertions pass" can both be true while a clock-domain bug sails through to gate-level simulation or, worse, to the lab.

## The skill is choosing, and a real bug often needs more than one

| If the bug is | Reach for |
|---|---|
| combinational, bit-level, or a missing default | **Formal** |
| reachable by a stimulus, needs a reference model, or is protocol timing | **Simulation** |
| a clock-domain, reset, or connectivity issue | **Structural** |
| a deadlock or fairness problem | **Formal** (bounded) plus a watchdog simulation |

A shared-bus deadlock ([lowRISC/lowrisc-chip #67](https://github.com/lowRISC/lowrisc-chip/issues/67)) is a liveness problem, where the good thing, forward progress, never happens: three masters wait on each other in a circle and the bus hangs forever. Random tests almost never hit it. Proving true unbounded liveness needs a commercial formal tool, so the open-source flow uses bounded model checking, which searches a fixed number of cycles and returns a concrete trace where a master is starved for the whole window. A watchdog simulation confirms the hang. Two methods, one bug, and an honest account of what each one proves.

The takeaway is not "formal beats simulation" or the reverse. It is that a verification flow which leans on one technique will systematically miss the bug classes the other two were built for. The teams shipping clean first silicon are the ones matching the proof to the bug, every time.

---

*This is the principle behind the ChipGPT co-worker. It reads your spec and your RTL, identifies the bug, and proves it the right way, in your own environment, with your RTL never leaving it.*

> See the ChipGPT co-worker find and prove these bug classes, live, on real open-source cores: **[chipgpt.ai/coworker](https://chipgpt.ai/coworker)**
