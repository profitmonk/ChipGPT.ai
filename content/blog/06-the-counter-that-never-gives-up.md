---
title: "The Counter That Never Gives Up: An 8-Bit Overflow in Ethernet"
description: "An 8-bit retry counter compared against a 16-bit limit can never reach it, so the give-up condition never fires and the logic retries forever. Here is why the corner hides, and how to prove it cannot happen."
date: "2026-07-14"
---

A counter that counts wrong is easy to spot. A counter that counts fine but is one bit too narrow for the number it is compared against is not, because it works for every value you are likely to test and fails only at the edge. That edge is where a real Ethernet design got stuck in a loop it could never leave.

## Where this sits in the flow

A chip or a networking block begins as a spec, becomes RTL, the Verilog or SystemVerilog that describes its logic, and then goes through verification, synthesis, and tapeout. This bug lives in the RTL, in a small counter, and it is the kind of thing that passes a normal test run and then wedges in the field under a configuration the tests never exercised.

## The setup: retries and a give-up limit

The block in question handles ARP, the Address Resolution Protocol. ARP is how a device on a network finds the hardware address, the MAC address, that belongs to a given IP address. It sends a request and waits for a reply. If no reply comes, it retries, and to avoid retrying forever it counts attempts and gives up after a configured limit.

Here is the mistake ([alexforencich/verilog-ethernet #75](https://github.com/alexforencich/verilog-ethernet/pull/75), CWE-190). In `arp_retry`, the retry counter is 8 bits wide. The retry limit it is compared against is 16 bits wide. An 8-bit counter can only hold values from 0 to 255. When it reaches 255 and increments again, it wraps back to 0, the way a car odometer rolls over. This wrap is an integer overflow: the value exceeds what the bits can represent and rolls around.

Now make the limit larger than 255. The give-up condition is "counter equals limit." But an 8-bit counter can never equal a value above 255, because it wraps first. So the give-up condition is never satisfied. The ARP request retries forever, and the logic that was waiting for it to finish never moves on.

## Why testing misses it

The bug depends entirely on configuration. With a small retry limit, say 16, the counter reaches it and everything behaves. The fault only appears when the limit is set above 255, and only then does the counter wrap past it.

A normal test suite checks that ARP resolves an address and that retries happen, using ordinary limit values. It does not usually sweep the limit up past the point where an 8-bit counter overflows, because nothing in a passing functional run points there. Code coverage looks complete, since every line of the counter and the comparison executes. The reachability question, "can the give-up condition ever be true for a large limit?", is simply not something a functional test asks.

So the bug escapes to a deployment that happens to configure a large retry limit, where the block silently retries without end and ties up whatever was waiting on it.

## What catches it: proving the give-up condition is reachable

The clean way to state the requirement is in terms of the spec's own intent: the counter must be able to represent every limit it is compared against, so that the give-up condition can actually be reached.

Two methods prove it. Formal verification, which checks a property against all possible inputs, can show that for any limit above 255 the condition "counter equals limit" is unreachable, which is the bug stated precisely. A directed simulation can do it concretely by configuring a large limit and watching the counter wrap past it without ever triggering the give-up. Both pin the fault to its real cause, a width mismatch between the counter and the value it must reach, not just a symptom.

## Why this is hard for today's tools

A good linter sometimes flags a width mismatch between two compared signals, and that is useful. But a width warning is easy to dismiss as noise, because most width differences are harmless. What matters here is not that the widths differ, it is that the difference makes a required condition unreachable. That is a correctness question about the design's behavior, not a style nit, and a linter that only reports the mismatch leaves an engineer to judge whether it matters. Functional tests, meanwhile, never drive the corner. The information needed to see the bug, that the limit can exceed what the counter holds and that this breaks the give-up logic, is spread across the spec, the counter width, and the comparison, and no single ordinary check brings them together.

## Why the co-worker helps: it reasons about the limit, not just the line

This is the kind of quiet corner the ChipGPT co-worker is meant to close, because it connects the spec's intent to the actual widths in the RTL.

**It works from intent, not just structure.** It reads that the limit can range up to a 16-bit value and that the counter is supposed to reach it, then asks whether an 8-bit counter actually can. That turns a width difference a linter would report as a maybe into a definite correctness gap: the give-up condition is unreachable for large limits.

**It remembers across designs.** Counter overflows and width mismatches that break a terminating condition are a recurring family of bugs. When a new design has the shape of one that caused a runaway loop on a past program, the co-worker recognizes it, even when the signals are renamed.

**It grounds its judgment in context.** It draws on the spec, the intent recorded in design discussions, and prior designs, not just the single line of comparison. That is what separates "these two signals have different widths" from "this counter cannot represent the limit the spec allows, so the request never gives up."

**It runs early.** The check happens at the RTL stage, while the counter is being written, not after a field deployment with a large limit wedges. The work runs in your own environment, and your RTL never leaves it.

An 8-bit counter against a 16-bit limit is a one-line mistake that no ordinary test exercises and no waveform makes obvious. Catching it means reasoning about what the counter has to reach, not just watching it count.

> See the ChipGPT co-worker prove the ARP retry overflow, live: **[chipgpt.ai/coworker](https://chipgpt.ai/coworker)**
