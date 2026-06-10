# OpenTitan Comportability & CDC Methodology

## Clock-Domain Crossing Rules

OpenTitan is a multi-clock-domain SoC: 95% of modern SoCs have multiple clock
domains (Wilson Research 2024). The life-cycle controller (`lc_ctrl`) runs in the
`io_div4` domain; the KMAC accelerator runs in the `main` domain.

> Every signal that crosses from one clock domain to another **must pass through
> a clock-domain-crossing synchronizer** — a two-flop (`prim_flop_2sync`)
> synchronizer for single-bit/level signals, or a full CDC handshake for
> multi-bit data — to prevent metastability.

A crossing without a synchronizer is invisible to zero-delay RTL simulation: the
sample always lands cleanly in sim. The failure only appears with real
back-annotated timing — i.e., in gate-level simulation or in silicon, after
hundreds of regression hours have already been spent.
