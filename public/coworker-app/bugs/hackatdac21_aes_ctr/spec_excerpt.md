# NIST SP 800-38A — Block Cipher Modes: Counter (CTR) Mode

## §6.5  The Counter Mode

CTR mode requires a sequence of counter blocks T_1, T_2, ..., T_n.

> The forward cipher function is applied to each counter block, and the
> resulting output blocks are XORed with the plaintext to produce the
> ciphertext.

> Across a single message, **the successive counter blocks must differ** —
> each is derived by incrementing the previous counter block.

If the counter does not advance, every block is enciphered with the SAME
keystream block. The cipher degenerates to a fixed-keystream one-time-pad,
and a known-plaintext attack trivially recovers the keystream. (CWE-1240)
