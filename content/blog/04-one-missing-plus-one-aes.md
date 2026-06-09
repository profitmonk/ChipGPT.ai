---
title: "One Missing +1: How an AES Counter Bug Breaks Your Crypto"
description: "A single missing increment turned a hardware AES engine into a fixed-keystream cipher anyone could break. Why functional tests miss it — and the one-line property that catches it."
date: "2026-06-30"
---

Some hardware bugs degrade performance. Some corrupt a corner case. And some quietly turn strong encryption into no encryption at all — while every functional test still reports "data encrypted successfully." A missing `+1` in an AES counter is exactly that kind of bug.

## A 30-second refresher on CTR mode

AES in counter (CTR) mode works like this: you take a counter value, encrypt *it* to produce a block of pseudorandom bits (the keystream), and XOR that keystream with your plaintext. For the next block, you **increment the counter**, encrypt the new value, and get a *fresh* keystream block. The security of the whole scheme rests on one rule:

> Every block uses a different counter value, so every block gets a different keystream.

That increment is load-bearing. Remove it and the scheme collapses.

## The bug

A Hack@DAC SoC shipped an AES block where, in CTR mode, the counter register never incremented ([Hack@DAC 2021](https://github.com/HACK-EVENT/hackatdac21), CWE-1240). The next-counter logic simply held its current value — the `+1` was missing on every path.

The consequence is catastrophic. Every block is now XORed with the **same** keystream. That's a fixed-keystream one-time-pad reused across the entire message — and reused keystream is the oldest break in the book. XOR two ciphertext blocks together and the keystream cancels, leaving you the XOR of two plaintexts. With any known or guessable plaintext, the keystream falls out and the rest of the message decrypts. The "encryption" is decorative.

## Why functional tests miss it

This is the dangerous part. A typical AES test feeds in plaintext, reads out ciphertext, and checks that the block cipher core produced the right output for a given input. The core *is* working. The S-boxes are right, the key schedule is right, the round function is right. Every one of those tests passes.

What the tests usually *don't* assert is the relationship *between consecutive blocks* — that block 2's counter differs from block 1's. So the one property that matters for CTR security is the one nobody checked. The ciphertext even looks random at a glance. You'd ship it.

## The one-line property that catches it

The fix on the verification side is to state the rule the spec actually requires and check it directly:

> In CTR mode, after a block completes, the counter must change.

Two complementary ways to prove it:

- **Formal.** Frame it combinationally — the next-counter value must differ from the current one under the increment condition — and a solver returns a counterexample immediately, because on the buggy RTL they're always equal.
- **Simulation.** A two-block directed test: encrypt, capture the counter, encrypt again, assert the counter changed. It fails on the bug and passes on the fix.

Either way, the test is trivial *once you know to write it.* The whole lesson of this bug is that block-level "does it encrypt?" testing is not the same as "is it secure?" — and the gap between them is one missing increment.

## The takeaway

Crypto bugs in RTL are uniquely punishing: they're small, they don't break functional tests, and they fail silently while looking fine. The defense is to verify the *security-relevant relationships* the standard demands — counter freshness, key isolation, mode invariants — not just block-level input/output. One missing `+1` is all it takes.

---

*The ChipGPT RTL/DV co-worker reads the crypto spec, finds the missing increment, and proves it both formally and in simulation — on your hardware, with your LLM, your RTL never leaving.*

> Watch it find the AES counter bug in seconds, live: **[chipgpt.ai/coworker](https://chipgpt.ai/coworker)**
