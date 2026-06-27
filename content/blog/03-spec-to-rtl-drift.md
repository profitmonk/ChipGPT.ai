---
title: "Spec-to-RTL Drift: The #1 Cause of Respins"
description: "Roughly 70% of respins are design errors where the RTL quietly diverged from the spec. Here is why one wrong bit survives every test, and how to close the loop between the document and the design."
date: "2026-06-23"
tldr_bug: "The address-validity check spans the wrong bit range ([63:39] instead of [63:38]), letting illegal addresses through."
tldr_miss: "Nothing links the spec PDF to the RTL, and the tests inherit the same misreading as the code."
tldr_fix: "Extract the rule from the spec, compare it to the actual RTL bit range, and leave a spec-to-test traceability link."
---

Ask why a chip needed a respin and the honest answer is usually mundane. The RTL did not do what the spec said. Not a clever corner case, just a place where the design drifted from the document and nobody noticed. A respin is a re-manufacturing of the chip after a bug is found, which means new photomasks and another fab run, and it costs months. Published industry analyses put roughly 70% of respins in the "design error" bucket, and a large share of those are spec misinterpretation. It is the single most common reason silicon comes back.

To see why drift is so hard to catch, it helps to follow a real one all the way down.

## Where drift comes from in the flow

A chip starts as a spec, usually a PDF that describes the intended behavior. Engineers read that spec and write RTL, the human-authored Verilog or SystemVerilog code that describes the chip's logic. Verification then checks the RTL, and after that comes synthesis, physical design, and tapeout, which is the point where the finished layout goes to the factory.

Drift is born at the very first translation, from the spec to the RTL. The document says one thing, the code says something slightly different, and from that moment on the two are free to disagree because nothing actively holds them together.

## What drift looks like: one bit

Drift is rarely dramatic. The RISC-V CVA6 core had a textbook case ([openhwgroup/cva6 #136](https://github.com/openhwgroup/cva6/issues/136)), and it came down to a single bit.

CVA6 implements Sv39, the RISC-V rule for 39-bit virtual addresses. A virtual address is the address a program uses, which the hardware translates to a physical location in memory. Sv39 has a strict rule about which addresses are even legal. The address is 64 bits wide, but only the lower 39 carry meaning, so the spec requires that the top bits all copy bit 38, the sign bit. In plain terms, bits [63:38] must all equal bit 38. An address that breaks this rule is called non-canonical, and the hardware is supposed to reject it. This is a memory-protection rule: it stops a program from reaching memory it should not.

The spec is explicit: the check covers bits [63:38]. The RTL in `load_store_unit.sv` checked bits [63:39]. One bit off. Bit 38 was excluded from the check, so a class of non-canonical addresses that should fault sailed straight through. In a production core, that is a virtual-memory protection bypass.

Nothing about that line looks wrong. It compiles, it simulates, and it passes the tests someone wrote, because the tests were written from the same misreading as the RTL. That is the trap. When the spec lives in a PDF and the RTL lives in a repository, the only thing connecting them is an engineer's memory, and memory drifts.

## Why it survives every check

Three structural reasons let drift reach silicon.

**The spec and the RTL are different artifacts in different tools.** There is no machine-checkable link between "the spec says bits [63:38]" and a line of Verilog that reads `vaddr[63:39]`. A human has to hold both in their head at once and spot the mismatch. With thousands of such details in a real design, some slip.

**Tests inherit the misreading.** If the designer misread the spec, the verification engineer often inherits the same assumption and writes tests that confirm the bug instead of exposing it. The test and the bug agree, so the test passes.

**Coverage cannot see correctness.** Coverage tells you a line of code executed. It says nothing about whether that line is correct relative to the spec. You can reach 100% coverage of a check that is wrong. Every metric the team watches stays green while the design quietly disagrees with the document it is supposed to implement.

Because of this, drift does not announce itself. It rides through simulation and coverage and lands in silicon, or, on a lucky project, gets caught very late in a manual audit after a lot of time is already spent.

## The fix: make the spec a checkable input

Catching drift means rebuilding the link the flow lost, so the spec stops being a PDF nobody re-reads and becomes something the design is checked against.

1. Extract the rule from the spec as a precise statement. "Bits [63:38] must equal bit 38" becomes a concrete relation, not prose buried in a paragraph.
2. Locate the matching logic in the RTL, the actual bit-range check, by parsing the design rather than searching its text by hand.
3. Compare the two. Where the RTL's range or condition disagrees with the spec, that is the drift.
4. Prove it both ways. Generate the spec-faithful assertion, which is a formal statement of the rule, and let a solver return a counterexample. For the CVA6 check, that counterexample is the exact non-canonical address that slips through. Then write a directed test that fails on the current RTL and passes on the fix.
5. Leave a traceability row that links spec section to RTL line to assertion to test, so the next engineer and the next revision inherit the link instead of the misreading.

That last step is what prevents re-drift. A one-time audit finds today's mismatch. A living spec-to-test link keeps the design honest as it changes.

## Why this is hard for today's tools

Linting, code review, and formal verification all exist and all help. The gap is that none of them start from the spec. A linter checks the code against generic coding rules, not against your document. Review depends on a human noticing. Formal verification is powerful, but a person still has to write the property, and if that person misread the spec, the property inherits the misreading exactly as the test did. The spec sits outside the loop, so the one source of truth the design is supposed to honor is the one input the tools never read.

## Why the co-worker helps: it starts from the spec

This is the case the ChipGPT co-worker is built for, because it reads the spec and the RTL together rather than the code alone.

**It works from intent, not just structure.** It reads the Sv39 text, derives the required relation that bits [63:38] must equal bit 38, then checks the RTL's actual bit range against it. The missing link between document and design, the link a human was holding in their head, becomes an explicit check. This is the whole game for drift, because the bug is invisible unless you compare the code to the spec it came from.

**It remembers across designs.** Off-by-one bit-range and canonicality checks are a recurring family of mistakes. When a new design has the same shape as one that caused a bypass on a past program, the co-worker recognizes it, even when the signals are renamed. A first-time mistake on your chip is rarely a first-time mistake in the world.

**It grounds its judgment in context.** It draws on the spec, the intent recorded in design discussions and reviews, and the prior designs it has seen, not just the single file in front of it. That is what separates "this check spans [63:39]" from "this check spans [63:39], the spec requires [63:38], and that exact off-by-one bypassed protection on an earlier core."

**It runs early, and leaves the link behind.** The check happens at the RTL stage, while the code is still being written, and it writes the spec-to-test traceability row so the design cannot quietly re-drift later. The work runs in your own environment, and your RTL never leaves it.

Drift is not a skill problem. It is a connection problem. The spec and the RTL were never wired together, so they were free to disagree. The teams that ship clean first silicon treat the spec as something the design is continuously checked against, not a document read once at the start.

> See the ChipGPT co-worker find the CVA6 off-by-one from the spec, live: **[chipgpt.ai/coworker](https://chipgpt.ai/coworker)**
