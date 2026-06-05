# SequenceConverter

Class that handles all nucleotide sequence conversions. It provides mapping tables for DNA and RNA complement and transcription, along with methods that apply those maps to input sequences.

## Constructor

```typescript
constructor()
```

Takes no arguments. Initializes the internal mapping tables.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `MAP_DNA_COMPLEMENT` | `{ [key: string]: string }` | Maps each DNA base to its complement: `{ A: "T", T: "A", C: "G", G: "C" }` |
| `MAP_RNA_COMPLEMENT` | `{ [key: string]: string }` | Maps each RNA base to its complement: `{ A: "U", U: "A", C: "G", G: "C" }` |
| `MAP_DNA_TRANSCRIPT` | `{ [key: string]: string }` | Maps each DNA base to its RNA transcript: `{ A: "U", T: "A", C: "G", G: "C" }` |

## Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `mapSequence` | `(sequence: string, map: Record<string, string>): string` | Applies a character-by-character mapping to the input sequence. Characters not present in the map are passed through unchanged. Returns an empty string if the input is falsy. |
| `getDNAComplement` | `(seq: string): string` | Returns the DNA complement of the input sequence using `MAP_DNA_COMPLEMENT`. |
| `getRNAComplement` | `(seq: string): string` | Returns the RNA complement of the input sequence using `MAP_RNA_COMPLEMENT`. |
| `getRNATranscriptFromDNA` | `(seq: string): string` | Returns the RNA transcript of the input DNA sequence using `MAP_DNA_TRANSCRIPT`. |
| `getDNAReverseComplement` | `(seq: string): string` | Returns the reverse complement of the input DNA sequence. The sequence is first complemented, then reversed. |
| `getOutputSequence` | `(sequence: string, conversionType: ConversionType): string` | Dispatches to the appropriate conversion method based on `conversionType`. Returns an empty string for unrecognized types. |
| `getLabel` | `(conversionType: ConversionType): string` | Returns a human-readable label for the conversion type (e.g., `"Complement DNA"`, `"RNA Transcript"`). |
| `isDNAType` | `(type: ConversionType): boolean` | Returns `true` if the conversion type starts with `"DNA"`. |
| `isRNAType` | `(type: ConversionType): boolean` | Returns `true` if the conversion type starts with `"RNA"`. |

## Example

```typescript
import { SequenceConverter } from "./logic/SequenceConverter";

const converter = new SequenceConverter();

// DNA complement
const complement = converter.getDNAComplement("ATGC");
// complement === "TACG"

// DNA reverse complement
const revComp = converter.getDNAReverseComplement("ATGC");
// revComp === "GCAT"

// RNA transcript from DNA
const transcript = converter.getRNATranscriptFromDNA("ATGC");
// transcript === "UACG"

// Dispatch by conversion type
const output = converter.getOutputSequence("ATGC", "DNA_REVERSE_COMPLEMENT");
// output === "GCAT"
```
