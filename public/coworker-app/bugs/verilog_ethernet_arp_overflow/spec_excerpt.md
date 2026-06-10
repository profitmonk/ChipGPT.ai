# ARP Retry Logic — Design Requirement

## Retry counting (RFC 826 ARP + design spec)

An ARP lookup retransmits the request until it is answered or a configured
**retry limit** is reached, after which the lookup is abandoned ("give up").

> The retry counter MUST be able to represent every value up to retry_limit.
> If the counter is narrower than the limit, it wraps before reaching it and
> the "give up" condition can never be satisfied — the request retries forever.

This is a classic integer-overflow / width-mismatch defect (CWE-190): a counter
whose width is smaller than the field it is compared against. The wrap is silent
in normal operation and only manifests for large limits.
