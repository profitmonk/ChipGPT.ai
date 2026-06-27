---
title: "Counted Twice: How One Extra Fall-Time Breaks I2C Timing"
description: "An I2C controller that adds the bus fall time twice holds its clock low one fall-time too long every cycle. The bus still works, the tests still pass, and the only proof is a directed test that measures against the spec."
date: "2026-07-21"
tldr_bug: "The SCL low period adds the bus fall time twice, holding the clock low one fall-time too long every cycle."
tldr_miss: "Functional tests check that bytes transfer, not the exact duration of the low phase."
tldr_fix: "Measure the real SCL low period against the spec's timing formula in a directed test."
---

Not every bug breaks a function. Some break a number. The design still does what it is supposed to do, just slightly wrong in a way no functional check is watching, and the error rides out to silicon inside a timing calculation that looks reasonable on the page. An I2C controller that counts one timing parameter twice is exactly this kind of bug.

## Where this sits in the flow

A chip moves from spec to RTL, the Verilog or SystemVerilog that describes its logic, then through verification, synthesis, and tapeout. This bug lives in the RTL, in the arithmetic that decides how long to hold a clock line. It is not a broken state machine or a wrong data value. It is a timing period that is off by a fixed amount, every single cycle, which makes it both subtle and persistent.

## A short primer on I2C timing

I2C is a simple two-wire bus used to connect chips on a board. One wire is the clock, called SCL, and the other is the data, called SDA. The controller drives the clock by holding SCL low for a while, then releasing it high, over and over.

The spec does not let the controller pick any low time it likes. It defines minimum timing parameters that keep the bus reliable. Two matter here. `t_low` is the minimum time SCL must stay low. `t_f` is the fall time, the short interval the signal takes to slide from high down to low. Because the fall is part of getting the line low, the correct low period is `t_low + t_f`, the minimum low time plus the one fall.

## The bug

In OpenTitan's I2C block ([lowRISC/opentitan #18492](https://github.com/lowRISC/opentitan/issues/18492), fixed in PR #21765, CWE-1298), the logic in `i2c_scl_low` computed the low period as `t_low + t_f + t_f`. It added the fall time twice. So SCL was held low one `t_f` longer than the spec calls for, on every clock cycle of every transfer.

Nothing about that breaks the protocol outright. The bus still clocks, data still moves, a transfer still completes. The clock is simply slower than it should be, by a small fixed margin, forever.

## Why functional tests miss it

A standard I2C test checks behavior. Does the controller address a device, does it read and write the right bytes, does a transfer start and stop correctly. All of that passes, because the bug does not change any of it. The data is correct. The handshake is correct. Only the duration of the low phase is wrong, and "does it transfer the right bytes" is not measuring duration.

The error is also small. One extra fall time per cycle is easy to overlook in a waveform unless you are specifically measuring the low period against the spec's formula. So the bug escapes the functional suite and reaches the bench, where it shows up, if it shows up at all, as a bus running slower than designed or as a timing-margin problem with a strict peripheral that expects spec-exact behavior.

## What catches it: a directed test against the spec model

This bug does not suit a formal property well, because the thing that is wrong is an arithmetic count of a timing parameter, best judged by measurement. The right method is a directed simulation, a test that drives the controller and measures the actual SCL low duration, then compares it against the period the spec model predicts, `t_low + t_f`. When the RTL produces `t_low + t_f + t_f`, the measured low time is one `t_f` too long and the test fails. This is exactly how the real fix was validated, with a device-interface-function test that checked the timing against the spec.

The key is that the check has to come from the spec's formula. Without the correct equation to compare against, a measured low period is just a number, and a number one fall-time too high looks perfectly plausible.

## Why this is hard for today's tools

Simulators measure timing all day, so the tool is not the obstacle. The obstacle is knowing the right answer to check against. Catching this requires someone to read the I2C timing section, derive that the low period should be `t_low + t_f` and not `t_low + t_f + t_f`, and then write a test that measures the real duration and compares. A generic functional suite never does this, because it is built to check that bytes move, not that a timing parameter was summed correctly. The spec holds the correct formula, and the spec is the input the ordinary flow does not read.

## Why the co-worker helps: it checks the math against the spec

This is precisely where the ChipGPT co-worker fits, because it reads the timing spec and the RTL together and compares the computation, not just the behavior.

**It works from intent, not just structure.** It reads the I2C timing requirement, derives that the low period should be `t_low + t_f`, and compares that to the RTL's `t_low + t_f + t_f`. The double-count is obvious the moment you hold the code against the spec's formula, which is exactly the comparison a behavior-only test never makes.

**It picks the right method.** A timing miscount is a measurement question, so the co-worker frames it as a directed simulation that measures the SCL low period against the spec model, the method that actually fits, rather than forcing it into a formal property where it does not belong.

**It remembers across designs.** Off-by-one and double-counted timing terms are a recurring family of bugs across protocol controllers. When a new design has the shape of one that miscounted a timing parameter on a past program, the co-worker recognizes it, even when the signals are renamed.

**It runs early.** The check happens at the RTL stage, while the timing logic is being written, not after a slow bus or an interop failure turns up on the bench. The work runs in your own environment, and your RTL never leaves it.

A clock held low one fall-time too long is the kind of error that hides inside a plausible-looking sum and passes every test that checks behavior instead of duration. Catching it means checking the arithmetic against the spec that defines the right answer.

> See the ChipGPT co-worker measure the I2C timing bug against the spec, live: **[chipgpt.ai/coworker](https://chipgpt.ai/coworker)**
