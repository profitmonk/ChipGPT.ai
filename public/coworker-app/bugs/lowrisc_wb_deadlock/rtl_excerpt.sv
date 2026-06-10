// wb_arbiter.sv  —  representative excerpt (see bug.json: source_url)
// 3-master Wishbone shared-bus arbiter.
module wb_arbiter (
    input  logic       clk_i,
    input  logic       rst_ni,
    input  logic [2:0] cyc_i,        // per-master bus request (CYC_O)
    output logic [2:0] gnt_o         // per-master grant
);
  // Wishbone B4: a pending master MUST eventually be granted (liveness).
  logic [1:0] owner_q, owner_d;      // current bus owner (0..2)

  // BUG (issue #67): the owner only changes when the CURRENT owner drops cyc_i.
  // If owner 0 waits on a response gated by owner 1, owner 1 on owner 2, and
  // owner 2 on owner 0 (a 3-way circular wait), no owner ever drops cyc_i, so
  // the arbiter never rotates -> the bus deadlocks. No timeout, no preemption.
  always_comb begin
    owner_d = owner_q;
    if (!cyc_i[owner_q])             // only rotates when the owner releases
      owner_d = (owner_q == 2'd2) ? 2'd0 : owner_q + 2'd1;
  end

  // CORRECT: bound the wait — rotate on a fairness/watchdog counter so a held
  // grant cannot stall the fabric forever (break the circular wait).

  always_ff @(posedge clk_i or negedge rst_ni)
    if (!rst_ni) owner_q <= 2'd0; else owner_q <= owner_d;

  assign gnt_o = (3'b001 << owner_q) & cyc_i;
endmodule
