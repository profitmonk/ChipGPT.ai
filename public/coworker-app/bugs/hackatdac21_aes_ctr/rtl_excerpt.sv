// aes_ctr.sv  -  representative excerpt illustrating the publicly-documented
// Hack@DAC 2021 AES-CTR bug (CWE-1240). This is our own depiction of the bug
// pattern, not a copy of upstream source. Bug report: see bug.json source_url.
// AES counter (CTR) mode block, counter register.
module aes_ctr_counter (
    input  logic         clk_i,
    input  logic         rst_ni,
    input  logic         mode_ctr_i,    // 1 = CTR mode
    input  logic         block_done_i,  // a block finished encrypting
    input  logic [127:0] ctr_init_i,
    output logic [127:0] ctr_o
);
  logic [127:0] ctr_q, ctr_d;

  // NIST SP 800-38A, CTR mode: the counter block is incremented for each
  // successive block:  T_j = E(K, ctr); ctr = inc(ctr).

  always_comb begin
    ctr_d = ctr_q;            // BUG (#14): counter is held — never incremented.
    // CORRECT:
    //   if (mode_ctr_i && block_done_i) ctr_d = ctr_q + 128'd1;
  end

  always_ff @(posedge clk_i or negedge rst_ni) begin
    if (!rst_ni) ctr_q <= ctr_init_i;
    else         ctr_q <= ctr_d;
  end

  assign ctr_o = ctr_q;
endmodule
