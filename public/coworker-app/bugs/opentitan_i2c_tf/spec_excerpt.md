# I2C Timing — SCL Low Period

## SCL low-period computation (I2C spec + OpenTitan timing model)

The I2C controller holds SCL low for a programmed period before releasing it.
The bus **fall time** (t_f) is the time SCL takes to fall, and it is counted
**once** as part of the SCL low interval.

> The SCL low period = t_low + t_f. The fall time is accounted for a single
> time; it MUST NOT be added more than once when computing the hold duration.

If t_f is double-counted, SCL is held low one fall-time too long every cycle:
the clock period is wrong, the bus runs slower than configured, and tightly
budgeted timing is violated. (CWE-1298)
