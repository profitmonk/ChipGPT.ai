// lc_ctrl_kmac_if.sv  —  representative excerpt (see bug.json: source_url)
// Life-cycle controller -> KMAC interface. Crosses io_div4 -> main clock domain.
module lc_ctrl_kmac_if (
    input  logic        clk_io_div4_i,   // source domain (lc_ctrl)
    input  logic        clk_main_i,      // destination domain (KMAC)
    input  logic        rst_ni,
    input  logic [7:0]  lc_token_i,      // generated in clk_io_div4 domain
    output logic [7:0]  kmac_token_o     // consumed in clk_main domain
);
  // Every signal crossing a clock domain must pass through a synchronizer
  // (prim_flop_2sync) or a CDC handshake — see CDC methodology.

  logic [7:0] token_q;

  // BUG (#20979): lc_token_i is sampled directly in the destination clock with
  // NO synchronizer. Metastability on the io_div4 -> main crossing. Escapes RTL
  // simulation (zero-delay), only surfaces in gate-level sim / silicon.
  always_ff @(posedge clk_main_i or negedge rst_ni) begin
    if (!rst_ni) token_q <= '0;
    else         token_q <= lc_token_i;   // <-- unsynchronized CDC
  end

  // CORRECT: instantiate a 2-flop synchronizer on the crossing:
  //   prim_flop_2sync #(.Width(8)) u_sync (
  //     .clk_i(clk_main_i), .rst_ni(rst_ni), .d_i(lc_token_i), .q_o(token_q));

  assign kmac_token_o = token_q;
endmodule
