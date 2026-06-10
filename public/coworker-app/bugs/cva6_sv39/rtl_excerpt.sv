// load_store_unit.sv  —  excerpt; the buggy conditional is VERBATIM from issue #136
// CVA6 virtual-address canonicality ("overflow") check for Sv39.
module sv39_vaddr_check (
    input  logic [63:0] vaddr,        // lsu_ctrl.vaddr in upstream
    output logic        page_fault_o  // drives the address-overflow page fault
);
  // RISC-V Priv spec, Sv39 (§4.4.1): bits [63:38] must all equal bit 38 — the
  // upper bits must be all-ones or all-zeros relative to the sign bit (bit 38).

  logic overflow;

  // BUG (issue #136): the reduction check spans [63:39] — off by one.
  // Bit 38 is excluded, so a non-canonical address whose bit 38 differs from
  // bits[63:39] is NOT flagged  =>  virtual-memory protection bypass.
  assign overflow = !((&vaddr[63:39]) == 1'b1 || (|vaddr[63:39]) == 1'b0);

  // CORRECT (matches current core/load_store_unit.sv, [XLEN-1:SV-1] = [63:38]):
  //   assign overflow = !((&vaddr[63:38]) == 1'b1 || (|vaddr[63:38]) == 1'b0);

  assign page_fault_o = overflow;
endmodule
