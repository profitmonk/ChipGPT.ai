---
title: "A Bus That Can Hang Forever: The Three-Way Deadlock"
description: "Three masters wait on each other in a circle and a shared bus stops forever. Random tests almost never hit it. Here is why deadlock is so hard to catch, and how a bounded proof exposes it."
date: "2026-07-07"
tldr_bug: "Three bus masters wait on each other in a circle and the arbiter never rotates, so the bus hangs forever."
tldr_miss: "The hang needs an exact simultaneous ordering of all three masters that random tests almost never hit."
tldr_fix: "Prove forward progress with bounded model checking plus a watchdog simulation that exhibits the starvation."
bug_number: "05"
codename: "A bus that hangs forever"
stakes: "The whole bus can freeze, permanently."
severity: "critical · liveness"
evidence: "M0 → M1 → M2 → M0  // circular wait"
teaser: "Three masters wait on each other in a circle and the bus never recovers."
---

Most bugs produce a wrong answer. This one produces no answer at all. A shared bus stops moving and never recovers, and the chip around it quietly wedges. The worst part is that the design can pass simulation for weeks before anyone sees it, because hitting the failure requires an exact sequence of events that random testing almost never produces.

The bug is a three-way bus deadlock, and to see why it hides so well you need to understand what a bus arbiter is supposed to guarantee.

## Where this sits in the flow

A chip is a spec turned into RTL, the Verilog or SystemVerilog code that describes its logic, then verified, synthesized, and eventually sent to the factory at tapeout. This bug lives in the RTL, in the logic that shares a bus between several blocks. If verification misses it, it does not show up as a wrong value in a waveform. It shows up as a hang, often during integration or in the lab, intermittently, which is the hardest kind of failure to reproduce.

## What a bus arbiter does, and how it deadlocks

A bus is a shared road that several blocks use to talk to memory and to each other. The blocks that start transfers are called masters. Because only one master can use the bus at a time, a small piece of logic called an arbiter decides whose turn it is and hands out ownership.

This example uses Wishbone, a common open bus standard. A master raises a signal called `cyc_i` to say "I am using the bus," and holds it until its transfer completes. The arbiter in `wb_arbiter` rotates ownership to the next master only when the current owner drops `cyc_i`.

Now picture three masters in a circle ([lowRISC/lowrisc-chip #67](https://github.com/lowRISC/lowrisc-chip/issues/67), CWE-833). Master A holds the bus while it waits for a response that depends on master B. Master B is holding its own request waiting on master C. Master C is waiting on A. Each master keeps `cyc_i` raised because none of them has completed, so none of them releases. The arbiter only rotates when an owner releases, so it never rotates. There is no timeout and no preemption to break the cycle. The bus is stopped, and nothing in the design will ever restart it. This is a deadlock: a circular wait in which everyone is blocked on someone else.

## Why simulation almost never catches it

A deadlock is what verification calls a liveness problem. It helps to name the two kinds of properties a design can have. A safety property says "something bad never happens," and when it breaks you get a finite trace showing the bad event. A liveness property says "something good eventually happens," for example "every master that requests the bus is eventually served." A deadlock is a liveness failure: the good thing, forward progress, never comes.

Liveness bugs are brutal to find by simulation. The hang only appears when three masters reach the exact circular pattern at the same time, holding the right requests in the right order. Random tests wander through the state space and almost never line up all three. You can run millions of cycles, watch every transfer that does complete succeed, and never trip the one ordering that locks. Coverage does not save you either, because exercising each master and each state individually says nothing about the specific simultaneous cycle that deadlocks.

So the bug escapes simulation and surfaces later, as an intermittent hang in integration or on the bench, with no wrong value to trace, just a bus that stopped.

## What catches it: a bounded proof, honestly described

The right tool here is formal verification, which reasons about the design mathematically rather than by running test vectors. But there is an honest limit worth being precise about.

Proving a true liveness property, "this bus can never deadlock, over infinite time," requires a solver that can reason about unbounded time. Commercial formal tools such as JasperGold and VC Formal have that engine and can prove unbounded liveness directly. The open-source formal stack does not. What it does is bounded model checking, which unrolls the design for a fixed number of cycles and searches for a violation within that window.

So the honest method is this. Add a starvation counter in the verification harness that counts how long a requesting master goes unserved, and assert it stays below a bound. Bounded model checking then returns a concrete trace in which a master is starved for the entire bound, which is a strong, exhibitable witness of the deadlock. A directed simulation with a watchdog timer confirms the hang independently. This is not the same as an unbounded liveness proof, and we do not claim it is. It is a bounded proof that produces the actual deadlock scenario, which is exactly what an engineer needs to see and fix.

This honesty matters. A flow that quietly called a bounded check a liveness proof would be overstating what it did. Naming the method correctly is part of trusting the result.

## Why the co-worker helps: it proves progress, not just values

This is the kind of bug the ChipGPT co-worker is built to reach, because it picks the method the bug actually needs and reads the bus's intent, not just its wiring.

**It works from intent, not just structure.** It reads what the arbiter is supposed to guarantee, that no master is starved and the bus always makes progress, and frames that as a property to prove. A flow that only checks data values never states the progress requirement at all, so it never tests the thing that fails.

**It picks the right method, and labels it honestly.** A deadlock will not fall out of more random simulation. The co-worker frames it as a bounded model-checking problem plus a watchdog simulation, and it describes the result for what it is, a bounded witness, not an unbounded liveness proof.

**It remembers across designs.** Circular-wait deadlocks recur across bus fabrics and arbiters, usually from a missing timeout or preemption. When a new arbiter has the shape of one that hung a past design, the co-worker recognizes it, even when the signals are renamed.

**It runs early.** The check happens at the RTL stage, while the fabric is still being written, not after an intermittent hang shows up in the lab and a team spends days trying to reproduce it. The work runs in your own environment, and your RTL never leaves it.

A bus that can hang forever is the kind of bug that does not fail loudly. It waits for the worst possible moment. Proving forward progress, with the right method and an honest description of what that method shows, is how you find it before it finds you.

> See the ChipGPT co-worker expose a real bus deadlock with a bounded proof, live: **[chipgpt.ai/coworker](https://chipgpt.ai/coworker)**
