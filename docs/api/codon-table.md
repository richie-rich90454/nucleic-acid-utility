# CodonTable

Class containing the standard genetic code lookup table. It maps all 64 RNA codons to their corresponding amino acid names, provides color mappings for visualization, and includes methods for anticodon derivation and protein decoding.

## Constructor

```typescript
constructor()
```

Takes no arguments. Initializes the codon table, amino acid colors, base colors, and the complement map used for anticodon computation.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `codonTable` | `{ [key: string]: string }` | 64 entries mapping RNA codons to amino acid names. Includes three stop codons (`"UAA"`, `"UAG"`, `"UGA"`) mapped to `"Stop"`. |
| `aminoAcidColors` | `{ [key: string]: string }` | Hex color values for each of the 20 standard amino acids. |
| `baseColors` | `{ [key: string]: string }` | Hex color values for the five nucleotide bases: `A`, `T`, `U`, `G`, `C`. |
| `COMPLEMENT_MAP_FOR_ANTICODON` | `{ [key: string]: string }` | Private. Maps RNA bases to their complements for anticodon derivation: `{ A: "U", U: "A", G: "C", C: "G" }`. |

## Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `getAnticodon` | `(codon: string): string` | Returns the anticodon for the given RNA codon. The anticodon is the reverse complement of the codon using the RNA complement map. |
| `decodeRNAtoProtein` | `(rnaSequence: string): ProteinResult` | Decodes an RNA sequence into a list of codon results. Reads the sequence in non-overlapping triplets from the 5' end. If the sequence length is not a multiple of 3, the remaining nucleotides are returned as `incomplete`. |
| `getBaseColor` | `(base: string): string` | Returns the hex color for a given base. Falls back to `"#6C757D"` for unknown bases. |
| `getBaseName` | `(base: string): string` | Returns the full name of a nucleotide base (e.g., `"Adenine"` for `"A"`). Falls back to the input character for unknown bases. |
| `getBaseNames` | `(sequence: string): string` | Returns a comma-separated string of full base names for the given sequence. |

## Types

### ProteinResult

```typescript
interface ProteinResult {
  codons: CodonResult[];
  incomplete: string | null;
}
```

- `codons` -- array of decoded codon results
- `incomplete` -- remaining nucleotides if the sequence length is not a multiple of 3, otherwise `null`

### CodonResult

```typescript
interface CodonResult {
  codon: string;
  anticodon: string;
  aminoAcid: string;
}
```

- `codon` -- the RNA triplet (e.g., `"AUG"`)
- `anticodon` -- the reverse complement of the codon (e.g., `"CAU"`)
- `aminoAcid` -- the amino acid name (e.g., `"Methionine"`) or `"Unknown"` if not in the table

## Example

```typescript
import { CodonTable } from "./logic/CodonTable";

const codonTable = new CodonTable();

// Decode an RNA sequence to protein
const result = codonTable.decodeRNAtoProtein("AUGGCCUAA");
// result.codons === [
//   { codon: "AUG", anticodon: "CAU", aminoAcid: "Methionine" },
//   { codon: "GCC", anticodon: "GGC", aminoAcid: "Alanine" },
//   { codon: "UAA", anticodon: "UUA", aminoAcid: "Stop" }
// ]
// result.incomplete === null

// Get anticodon
const anticodon = codonTable.getAnticodon("AUG");
// anticodon === "CAU"

// Get base names
const names = codonTable.getBaseNames("ATGC");
// names === "Adenine, Thymine, Guanine, Cytosine"
```
