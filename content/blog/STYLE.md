# Blog editorial spec (the writing brief)

This is the "system prompt" for every technical blog post in this folder. Read it
before writing or editing a post. The goal: posts that teach a real chip design or
verification problem from first principles, read like a working engineer wrote
them, and make the value of the relevant ChipGPT co-worker obvious without hype.

**Scope is the whole spec-to-GDS flow, not just RTL verification.** GDS (GDSII) is
the final layout file a fab turns into photomasks, so "spec to GDS" means the
entire chip design journey. ChipGPT is a fleet of co-workers across that flow:
design, integration, verification, synthesis, timing, and physical design. A post
can be about any stage. The shipping demos today are bug-finding (the S1 Bug
Hunter), so the early posts lean that way, but this template and voice apply to
every stage as the fleet grows.

Source of truth for all blogs is this folder (`ChipGPT.ai/content/blog/`). Nothing
generates these posts; they are authored here directly.

## 1. Audience
A verification or design engineer, a verification lead, or an SoC architect. Also a
smart technical reader who is not a hardware specialist (an investor, a software
engineer). Write so both can follow it. Assume intelligence, do not assume hardware
vocabulary.

## 2. Required structure: Problem, Solution, Value
Every post follows this arc. Use it as the spine, not as rigid headers to fill.

1. **The problem.** What goes wrong, explained from first principles. The problem
   need not be a bug. It can be a spec drift, an integration mismatch, a timing
   failure, or a productivity sink that eats engineer-days. Name the real
   consequence (a security bypass, a hung bus, a broken cipher, weeks lost to
   boilerplate, a chip that misses its clock target).
2. **Why it escapes or hurts today.** Why the current state of the art misses it,
   makes it expensive, or leaves it to scarce experts. This is the tension.
3. **The solution.** The specific method or approach that actually addresses it,
   explained plainly. Say what "proof" or "fix" means here.
4. **The value of the co-worker, technical first.** Why ChipGPT helps:
   - **Faster:** done in seconds or minutes by reading the spec and the design
     together, instead of a human holding both in their head.
   - **Better:** applies the right method for the task, so it catches or solves a
     class of problem a single-method or manual flow is blind to.
   - **Earlier:** caught at the source stage, before the problem surfaces in slow
     late-stage simulation, in timing closure, or in the lab. State this as
     stage-of-discovery and rework avoided. No invented dollar figures.

   Make the co-worker's differentiators explicit wherever they apply. They are the
   reason it catches what point tools miss, so do not leave them implicit:
   - **It works from the spec and design intent, not just the structure of the
     RTL.** It reasons about what the design is supposed to do, so it can tell a
     real gap from a safe one that a structure-only tool would either miss (because
     a human waived it) or flag as noise.
   - **It remembers across designs.** It recognizes a pattern that caused a problem
     on a past program even when the signals are renamed, so each design checked
     makes the next one safer.
   - **It grounds its judgment in context** (the spec, design discussions, prior
     designs), not only the single file in front of it.
   - **It runs in the loop, at the source stage**, not as a separate heavyweight
     tool an expert configures near the deadline.
   Always explain *why* each of these helps. Never explain how it is built (§9).

## 3. First principles, always
Explain the mechanism, not just the name. A reader should finish understanding
*why* the problem happens, not just *that* it does. Build the idea up from
something they already know. If a concept needs a 30-second primer (counter mode,
clock domains, virtual addresses, static timing), write the primer.

## 4. Ground every post in the spec-to-GDS flow
Place the problem in the chip development pipeline so the reader sees where it is
born, where it should be caught or solved, and where it actually escapes to. Use
this canonical flow as the shared map (define the relevant stages in-post):

1. **Spec / microarchitecture** (the intended behavior, often a PDF).
2. **RTL design** (engineers write Verilog / SystemVerilog: the logic of the chip).
3. **Functional verification** (simulation with directed and random tests; formal
   property checking; coverage closure; lint and clock-domain structural checks).
4. **Synthesis** (RTL becomes a gate-level netlist of standard cells).
5. **Gate-level simulation and static timing** (slower, models real timing delays).
6. **Place and route, timing and physical signoff** (the physical layout).
7. **GDSII and tapeout** (the layout is finalized as a GDSII file, the format the
   fab turns into photomasks).
8. **Silicon bring-up** (first chips tested in the lab).

A **respin** is when a problem reaches silicon and forces a fix back at stage 2,
then a re-run of stages 4 to 7 with a new mask set. It costs months. The whole
point of catching things early is to fix at stage 2 or 3 instead of stage 5, 8, or
a respin.

## 5. Be honest about the state of the art
Do not strawman existing tools. Say what simulation, formal tools, commercial CDC
checkers, synthesis and timing tools, and coverage genuinely do well, then show the
specific gap: where they go blind, where they are siloed, where they need scarce
expertise, where the spec and the design were never linked. Credibility with
engineers depends on getting this fair.

## 6. Jargon: define on first use, inline
Every acronym and term gets a plain-language gloss the first time it appears, in a
parenthetical or a short sentence. Examples: RTL (the human-written code that
describes the chip's logic), tapeout (sending the finished design to the factory),
GDSII (the final layout file the fab uses), metastability (a flip-flop caught
mid-transition outputting neither a clean 0 nor 1). No glossary dumps; weave it in.

## 7. Value is technical first
Lead with engineering value: time, method coverage, stage of discovery. Do not
invent dollar amounts, percentages, benchmarks, or customer quotes. Real, cited,
public statistics are allowed (for example first-silicon-success rates from
published industry surveys, with the source named).

## 8. Write like a person, not an AI
Concrete, specific, and a little opinionated. A working engineer talking to a peer.

Do this:
- Vary sentence length. Short blunt sentences next to longer explanatory ones.
- Use real specifics: signal names, bit ranges, issue numbers, module names.
- Have a point of view. First person ("I", "we") is fine.
- Prefer active voice and plain verbs.

Avoid these tells:
- **Em dashes.** Use commas, colons, parentheses, or a new sentence instead.
- The "not X, but Y" and "Not A. B." fragment pattern used as a tic.
- Rule-of-three lists everywhere ("faster, cheaper, better").
- Transition-word salad: Moreover, Furthermore, Additionally, Ultimately, Notably,
  In conclusion.
- Grandiose openers ("In today's fast-paced world of...").
- Empty summary sentences that restate what was just said.
- Uniform paragraph rhythm, over-bolding, bullet-point soup, emoji.
- Hedge-stacking ("can be", "may", "arguably", "often") when you can just say it.

## 9. Honesty, evidence, and guardrails
- **Honesty over hype.** Label proofs precisely. A bounded check is not a liveness
  proof. If a demo shows a representative run rather than a live tool run, say so.
- **No mechanism leakage.** Show the *what* and the *why*. You may describe the
  *value* of the co-worker's memory and cross-design learning, that it recognizes
  patterns from past designs and prior bugs even after signals are renamed. Do not
  reveal the proprietary *how*: not the internal tool contract, the EDA-as-validator
  internals, the corpus build, or the fingerprinting and memory implementation.
- **Grounded in public information.** Prefer a real, already-public, cited bug or
  issue, and link it. Where no public example exists or can be shown, a synthetic or
  representative example is fine if it is built from public information (a published
  spec, standard, or datasheet) and **clearly labeled as representative**. Never
  present a synthetic example as a real shipped bug, and never use private or
  customer data.

## 10. Formatting, length, frontmatter
- Prose-forward. A table or list only when it genuinely clarifies.
- Length serves clarity, not a word target. Long is fine if every paragraph earns
  its place. Roughly 900 to 1,500 words is typical.
- Frontmatter: `title`, `description`, `date` (and `author` / `featured` when it
  applies). Title and description are specific and search-aware, not clickbait.
- One call to action at the end, not mid-post:
  > See the ChipGPT co-worker find and prove this, live: **chipgpt.ai/coworker**

## 11. Pre-publish checklist
- [ ] Problem, why-it-escapes, solution, and technical value are all present.
- [ ] Every term is defined on first use.
- [ ] The problem is placed in the spec-to-GDS flow.
- [ ] The state of the art is described fairly, then the gap.
- [ ] A real cited public bug, or a clearly-labeled synthetic example grounded in
      public info, anchors the post.
- [ ] No em dashes. No AI tells from section 8.
- [ ] No proprietary mechanism revealed.
- [ ] Value is technical, with no invented numbers.
