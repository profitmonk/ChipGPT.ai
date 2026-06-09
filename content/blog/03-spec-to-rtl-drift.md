---
title: "Spec-to-RTL Drift: The #1 Cause of Respins"
description: "Roughly 70% of respins are design errors — the RTL quietly diverged from the spec. Here's why drift is so hard to catch, and how to close the loop between the document and the design."
date: "2026-06-23"
---

Ask why a chip needed a respin and the honest answer is usually mundane: the RTL didn't do what the spec said. Not a clever corner case — a place where the design *drifted* from the document and nobody noticed. Industry analyses put roughly 70% of respins in the "design error" bucket, and a large share of those are spec misinterpretation. It is the single most common reason silicon comes back.

## What drift looks like

Drift is rarely dramatic. It's a single bit.

The RISC-V CVA6 core had a textbook example ([issue #136](https://github.com/openhwgroup/cva6/issues/136)). The Sv39 virtual-memory spec is explicit: for an address to be valid, bits `[63:38]` must all equal bit 38 — the sign bit. The RTL checked bits `[63:39]`. One bit off. Bit 38 was excluded from the check, so a class of non-canonical addresses that should fault sailed through — a virtual-memory protection bypass, in a production core.

Nothing about that line *looks* wrong. It compiles, it simulates, it passes the tests someone wrote — because the tests were written from the same misreading as the RTL. That's the trap: when the spec lives in a PDF and the RTL lives in a repo, the only thing connecting them is an engineer's memory, and memory drifts.

## Why it's so hard to catch

Three structural reasons:

1. **The spec and the RTL are different artifacts in different tools.** There's no machine-checkable link between "§4.4.1 says bits 63:38" and `assign overflow = ...[63:39]...`. A human has to hold both in their head simultaneously and spot the mismatch.
2. **Tests inherit the misreading.** If the designer misread the spec, the verification engineer often inherits the same assumption — and writes tests that confirm the bug instead of catching it.
3. **Coverage can't see it.** Code coverage tells you the line executed; it doesn't tell you the line is *wrong relative to the spec.* You can have 100% coverage of an incorrect check.

This is why drift survives to silicon: every metric the team watches can be green while the design quietly disagrees with the document it's supposed to implement.

## Closing the loop

Catching drift means re-establishing the link the flow lost — making the spec a first-class, checkable input rather than a PDF nobody re-reads:

1. **Extract the rule from the spec as a precise statement.** "Bits 63:38 must equal bit 38" becomes a concrete relation, not prose.
2. **Locate the corresponding logic in the RTL** — the actual bit-range check, by parsing the design, not grepping.
3. **Compare them.** Where the RTL's range or condition disagrees with the spec's, that's the drift.
4. **Prove it both ways.** Generate the spec-faithful assertion and let a solver return a counterexample (for the CVA6 check, the exact non-canonical address). Then a directed test that fails on the current RTL and passes on the fix.
5. **Leave a traceability row** linking spec section → RTL line → assertion → test, so the next person — and the next revision — inherits the link instead of the misreading.

That last step is what actually prevents *re-*drift. A one-time audit finds today's mismatch; a living spec-to-test trace keeps the design honest as it changes.

## The takeaway

Drift isn't a skill problem — it's a *connection* problem. The spec and the RTL were never wired together, so they were free to disagree. The teams that ship clean first silicon are the ones who treat the spec as something the design is continuously checked *against*, not a document read once at the start.

---

*The ChipGPT RTL/DV co-worker reads the spec and the RTL, finds where they've drifted, proves the discrepancy with an assertion and a test, and writes the spec-to-test traceability row — on your hardware, with your LLM, your RTL never leaving.*

> See it find the CVA6 off-by-one from the spec, live: **[chipgpt.ai/coworker](https://chipgpt.ai/coworker)**
