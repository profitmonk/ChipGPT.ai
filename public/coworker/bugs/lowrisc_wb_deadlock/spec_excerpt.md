# Wishbone B4 — Shared-Bus Arbitration & Liveness

## Multi-master arbitration

A shared Wishbone bus with multiple masters needs an arbiter that guarantees
**every requesting master is eventually granted** — no starvation, no deadlock.

> When two or more MASTERs request the bus, the arbiter MUST select one, and
> once a transfer completes (CYC_O negated) it MUST allow a different waiting
> MASTER to proceed — so that no MASTER waits forever.

A correct arbiter is *live*: from any state, a pending request leads to a grant
within bounded time. An arbiter that can enter a state where each master holds a
resource the next one needs — a **circular wait** — deadlocks: the bus hangs and
no master ever makes progress. (CWE-833: Deadlock)
