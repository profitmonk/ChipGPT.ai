// arp.sv  —  representative excerpt (see bug.json: source_url)
// ARP request retry counter.
module arp_retry (
    input  logic        clk_i,
    input  logic        rst_ni,
    input  logic        req_sent_i,     // pulse: an ARP request went out
    input  logic [15:0] retry_limit_i,  // give up after this many retries
    output logic        give_up_o
);
  // Each unanswered ARP request increments a retry counter; when it reaches the
  // 16-bit retry limit, the lookup is abandoned (give_up_o asserts).

  logic [7:0] retry_q;                  // BUG (PR #75): counter is only 8 bits

  always_ff @(posedge clk_i or negedge rst_ni)
    if (!rst_ni)         retry_q <= 8'd0;
    else if (req_sent_i) retry_q <= retry_q + 8'd1;   // wraps 255 -> 0

  // BUG: an 8-bit counter compared against a 16-bit limit. Past 255 it wraps to
  // 0, so for any retry_limit_i > 255 the comparison is never true -> give_up_o
  // never asserts and the ARP request loops forever. CWE-190 integer overflow.
  assign give_up_o = (retry_q >= retry_limit_i);

  // CORRECT (PR #75): widen the counter to match the limit field:
  //   logic [15:0] retry_q;  ... retry_q <= retry_q + 16'd1;
endmodule
