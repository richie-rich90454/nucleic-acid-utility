# Visualizations

The application renders two types of visual output depending on the conversion type.

## Antiparallel Strand Diagrams

Displayed for the following conversions:

- DNA to Complement DNA
- DNA to Reverse Complement
- DNA to RNA Transcript
- RNA to Complement RNA

The diagram consists of two rows of colored nucleotide blocks. The top row represents the input strand (5' to 3' direction, left to right). The bottom row represents the output strand (3' to 5' direction, left to right), reflecting the antiparallel nature of double-stranded nucleic acids. Connecting lines are drawn between paired bases to indicate Watson-Crick base pairing.

## Polypeptide Chain View

Displayed for protein translation conversions (RNA to Protein and DNA to Protein).

Each amino acid is represented by a circle labeled with its single-letter code. Circles are connected by lines to indicate peptide bonds. Hovering over a circle reveals the full amino acid name in a tooltip.

## Color Coding

Nucleotide bases are color-coded consistently across all visualizations:

| Base | Color | Hex Code |
|------|-------|----------|
| A (Adenine) | Red | `#FF6B6B` |
| T (Thymine) | Teal | `#4ECDC4` |
| U (Uracil) | Green | `#1A936F` |
| G (Guanine) | Gold | `#FFD166` |
| C (Cytosine) | Purple | `#6A0572` |

## Accessibility

All canvas-based visualizations include an ARIA `role="img"` attribute. A dynamic `aria-label` is generated for each canvas, providing a textual description of the visualization content. This ensures screen reader users receive meaningful information about the rendered output.
