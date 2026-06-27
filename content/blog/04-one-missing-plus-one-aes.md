---
title: "One Missing +1: How an AES Counter Bug Breaks Your Crypto"
description: "A single missing increment turned a hardware AES engine into a fixed-keystream cipher anyone could break, while every functional test still passed. Here is why, and the one property that catches it."
date: "2026-06-30"
tldr_bug: "In counter mode the counter never increments, so every block is encrypted with the same keystream."
tldr_miss: "Block-level tests check that the cipher encrypts correctly, never that consecutive blocks use different counters."
tldr_fix: "Assert the invariant the standard requires: after each block the counter must change."
bug_number: "04"
codename: "One missing +1"
og_mono: "+1"
stakes: "Strong encryption silently becomes none."
severity: "critical · silent failure"
evidence: "ctr → 0 0 0 0  // keystream reused"
teaser: "A missing increment turns a hardware AES engine into a fixed-keystream cipher."
---

Some hardware bugs degrade performance. Some corrupt a corner case. And some quietly turn strong encryption into no encryption at all, while every functional test reports "data encrypted successfully." A missing `+1` in an AES counter is exactly that kind of bug. AES is the Advanced Encryption Standard, the block cipher that protects most encrypted data in the world, and this bug shipped in a hardware implementation of it.

To see why one missing increment is catastrophic, you need 30 seconds on how this mode of AES works.

## A short primer on counter mode

AES on its own encrypts one fixed-size block at a time. To encrypt a long message, you run it in a mode. Counter mode, written CTR, works like this. You take a counter value and encrypt it to produce a block of pseudo-random bits called the keystream. You then combine that keystream with your plaintext, the original data, using XOR, a bitwise operation that flips bits and is its own inverse. The result is the ciphertext, the encrypted output. For the next block you increment the counter, encrypt the new value, and get a fresh keystream block.

The security of the whole scheme rests on one rule:

> Every block uses a different counter value, so every block gets a different keystream.

That increment is load-bearing. Remove it and the scheme collapses.

## The bug

A Hack@DAC system-on-chip shipped an AES block where, in CTR mode, the counter register never incremented ([Hack@DAC 2021](https://github.com/HACK-EVENT/hackatdac21), ground-truth bug #14, CWE-1240). Hack@DAC is a public hardware-security contest whose designs come with a known list of planted bugs, so this one is documented in full. In `aes_ctr.sv`, the next-counter logic simply held its current value. The per-block `+1` was absent on every path.

The RTL shown in our demo is our own representative excerpt illustrating this publicly documented bug, not a copy of the upstream source.

The consequence is total. Every block is now combined with the same keystream. That is a one-time pad reused across the entire message, and reused keystream is the oldest break in cryptography. XOR two ciphertext blocks together and the shared keystream cancels, leaving the XOR of two plaintexts. With any known or guessable plaintext, the keystream falls out and the rest of the message decrypts. The encryption is decorative.

## Why functional tests miss it

This is the dangerous part. A typical AES test feeds in plaintext, reads out ciphertext, and checks that the core produced the right output for a given input. The core is working. The S-boxes, which are the substitution tables at the heart of AES, are correct. The key schedule, which expands the key into per-round keys, is correct. The round function is correct. Every one of those tests passes.

What the tests usually do not assert is the relationship between consecutive blocks, that block 2's counter differs from block 1's. So the one property that matters for CTR security is the one nobody checked. The ciphertext even looks random at a glance, because a fixed keystream XORed with varying plaintext still produces varying output. You would ship it.

This is where the bug escapes to. It passes block-level simulation, passes coverage, and reaches the field as a cipher that looks fine and protects nothing, until someone who collects two ciphertexts notices the keystream cancels.

## The property that catches it

The fix on the verification side is to state the rule the spec actually requires and check it directly:

> In CTR mode, after a block completes, the counter must change.

There are two complementary ways to prove it, and they line up with the two main verification methods.

**Formal.** Formal verification asks a solver to find any input, across all of time or up to a bound, that violates a stated property. Frame the rule combinationally: the next-counter value must differ from the current one under the increment condition. On the buggy RTL the two are always equal, so the solver returns a counterexample immediately.

**Simulation.** Simulation runs the design with specific inputs and watches the output. A two-block directed test encrypts, captures the counter, encrypts again, and asserts the counter changed. It fails on the bug and passes on the fix.

Either way, the test is trivial once you know to write it. The whole lesson of this bug is that block-level "does it encrypt?" testing is not the same as "is it secure?", and the gap between them is one missing increment.

## Why this is hard for today's tools

Formal tools and simulators are both perfectly capable of catching this. The gap is knowing to ask. A standard AES verification suite checks the block cipher against test vectors, which is exactly the part that was correct here. The security-relevant invariant, counter freshness across blocks, is not a generic property any tool writes for you. Someone has to read the mode's security definition, understand why the increment matters, and translate that into a property. On a busy team, the relationship between blocks is precisely the kind of thing that falls between the cracks of block-level testing.

## Why the co-worker helps: it knows what the cipher must guarantee

This is where the ChipGPT co-worker earns its place, because it reads the crypto spec, not just the block-level interface.

**It works from intent, not just structure.** It reads what CTR mode requires and recognizes the security invariant that each block must use a fresh counter, then checks the RTL against that invariant rather than only against input-output vectors. It is asking "is this secure?", not just "does it encrypt?", which is the question the standard suite skipped.

**It remembers across designs.** Crypto invariant violations are a recurring family: counter reuse, nonce reuse, weak key handling, mode confusion. When a new design has the shape of one that broke a cipher on a past program, the co-worker flags it, even when the signals are renamed. The oldest break in the book stays caught.

**It grounds its judgment in context.** It draws on the cipher's specification, the intent captured in design discussions, and prior designs it has seen, not just the file in front of it. That is what turns a flat "the counter does not change" into "the counter does not change, CTR security depends on it changing every block, and this is the keystream-reuse failure."

**It runs early, with the right method.** It catches this at the RTL stage, while the code is being written, and it proves it both formally and in simulation, the two methods that fit this bug. The work runs in your own environment, and your RTL never leaves it.

Crypto bugs in RTL are uniquely punishing. They are small, they pass functional tests, and they fail silently while looking fine. The defense is to verify the security-relevant relationships the standard demands, counter freshness, key isolation, mode invariants, not just block-level input and output. One missing `+1` is all it takes.

> See the ChipGPT co-worker find the AES counter bug in seconds, live: **[chipgpt.ai/coworker](https://chipgpt.ai/coworker)**
