# UrlHandler

Class for parsing and building URL parameters for deep linking. It enables sharing conversion states via URL query strings and updating the browser document title to reflect the current conversion.

## Constructor

```typescript
constructor()
```

Takes no arguments. Initializes the bidirectional mapping between URL parameter names and `ConversionType` values.

## Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `parseUrlParams` | `(): UrlParseResult \| null` | Reads the current URL query string and returns a parsed result if a recognized parameter is found. Strips invalid characters and uppercases the sequence. Returns `null` if no valid parameter is present. |
| `buildShareUrl` | `(sequence: string, conversionType: ConversionType): string` | Constructs a full URL with the appropriate query parameter for the given sequence and conversion type. |
| `updateDocumentTitle` | `(sequence: string, conversionType: ConversionType): void` | Sets `document.title` to a string containing the conversion type and sequence (e.g., `"DNA_COMPLEMENT for ATGC - Nucleic Acid Utility"`). |

## Types

### UrlParseResult

```typescript
interface UrlParseResult {
  sequence: string;
  conversionType: ConversionType;
}
```

- `sequence` -- the nucleotide sequence extracted from the URL, uppercased with invalid characters removed
- `conversionType` -- the conversion type inferred from the URL parameter

## Parameter Mapping

The following URL parameter names map to `ConversionType` values:

| URL Parameter | ConversionType |
|---------------|---------------|
| `dna_dna` | `DNA_COMPLEMENT` |
| `dna_revcomp` | `DNA_REVERSE_COMPLEMENT` |
| `dna_rna` | `DNA_TRANSCRIPT` |
| `rna_rna` | `RNA_COMPLEMENT` |
| `rna_protein` | `RNA_PROTEIN` |
| `dna_protein` | `DNA_PROTEIN` |

## Fallback Behavior

If none of the typed parameters are present, `parseUrlParams` checks for a generic `sequence` parameter. If found, it infers the conversion type from the sequence content:

- Sequences containing `U` but not `T` are treated as `RNA_PROTEIN`
- All other sequences are treated as `DNA_PROTEIN`

## Example

```typescript
import { UrlHandler } from "./logic/UrlHandler";

const handler = new UrlHandler();

// Given URL: https://example.com/?dna_dna=ATGC
const parsed = handler.parseUrlParams();
// parsed === { sequence: "ATGC", conversionType: "DNA_COMPLEMENT" }

// Build a share URL
const shareUrl = handler.buildShareUrl("AUG", "RNA_PROTEIN");
// shareUrl === "https://example.com/?rna_protein=AUG"

// Update the document title
handler.updateDocumentTitle("ATGC", "DNA_COMPLEMENT");
// document.title === "DNA_COMPLEMENT for ATGC - Nucleic Acid Utility"
```
