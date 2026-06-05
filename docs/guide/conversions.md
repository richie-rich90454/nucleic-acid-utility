# Conversion Types

The application supports six conversion operations, each accepting a specific input format and producing a defined output.

## Conversion Reference

| # | Conversion | Input Format | Output | Description |
|---|-----------|-------------|--------|-------------|
| 1 | DNA to Complement DNA | DNA (A, T, G, C) | DNA | Watson-Crick base pairing: A becomes T, T becomes A, C becomes G, G becomes C |
| 2 | DNA to Reverse Complement | DNA (A, T, G, C) | DNA | Complement is computed first, then the resulting sequence is reversed. This yields the template strand in the 5' to 3' direction |
| 3 | DNA to RNA Transcript | DNA (A, T, G, C) | RNA | The complement is computed and thymine (T) is replaced with uracil (U), producing the mRNA transcript |
| 4 | RNA to Complement RNA | RNA (A, U, G, C) | RNA | Watson-Crick RNA pairing: A becomes U, U becomes A, C becomes G, G becomes C |
| 5 | RNA to Protein | RNA (A, U, G, C) | Protein | Codons (triplets) are translated using the standard genetic code. The output is a sequence of single-letter amino acid codes |
| 6 | DNA to Protein | DNA (A, T, G, C) | Protein | Transcription to RNA is performed first, followed by translation of codons using the standard genetic code |

## Input Validation

Sequences are validated in real time as the user types.

- **DNA sequences** accept only the characters A, T, G, and C (case-insensitive).
- **RNA sequences** accept only the characters A, U, G, and C (case-insensitive).
- Whitespace and numeric characters are stripped automatically before processing.

The input field border color indicates validation state:

- **Green border** - the sequence is valid for the selected conversion type.
- **Red border** - the sequence contains characters that are invalid for the selected conversion type.

Invalid sequences cannot be submitted for conversion.
