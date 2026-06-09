# RISC-V Privileged ISA — Sv39 Virtual-Memory System

## §4.4.1  Addressing and Memory Protection

Sv39 implementations support a 39-bit virtual address space, divided into pages.

> Instruction fetch addresses and load/store effective addresses, which are
> 64 bits, **must have bits 63:38 all equal to bit 38**, or else a page-fault
> exception will occur.

This is the *canonicality* requirement:  vaddr[63:38] == {26{vaddr[38]}}.

Rationale: reserving the unused high address bits prevents software from relying
on bits that future wider-address modes (Sv48, Sv57) will define, and closes a
memory-protection hole where non-canonical addresses alias into mapped regions.
