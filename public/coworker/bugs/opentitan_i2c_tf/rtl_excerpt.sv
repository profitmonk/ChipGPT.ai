// i2c_timing.sv  —  representative excerpt (see bug.json: source_url)
// I2C SCL low-period timing computation.
module i2c_scl_low (
    input  logic [15:0] t_low_i,     // programmed SCL low time
    input  logic [15:0] t_f_i,       // bus fall time (t_f)
    output logic [15:0] scl_low_o    // cycles to hold SCL low
);
  // I2C spec: the SCL low period already accounts for ONE fall time.
  //   scl_low = t_low + t_f
  // The fall time must NOT be added more than once.

  // BUG (issue #18492): t_f is added twice -> the fall-time interval is
  // double-counted. SCL is held low one t_f too long every cycle, so the bus
  // runs slower than configured and violates the timing budget. CWE-1298.
  assign scl_low_o = t_low_i + t_f_i + t_f_i;

  // CORRECT (PR #21765): count the fall time once.
  //   assign scl_low_o = t_low_i + t_f_i;
endmodule
