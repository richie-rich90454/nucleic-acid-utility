# API Overview

The business logic of Nucleic Acid Utility is organized into 7 headless TypeScript classes with zero React dependency. These classes encapsulate all sequence conversion, validation, visualization, and utility logic, and they can be used independently in any JavaScript or TypeScript project.

## Architecture

```
                    +---------------------+
                    |  SequenceConverter  |
                    +---------------------+
                      ^            ^
                      |            |
          +-----------+            +-----------+
          |                                    |
+------------------+                  +------------------+
| SequenceValidator|                  |  CanvasRenderer  |
+------------------+                  +------------------+
                                             |
                                    +------------------+
                                    |    CodonTable    |
                                    +------------------+
                                             ^
                                             |
+------------------+                  +------------------+
|   UrlHandler     |                  | ClipboardManager |
+------------------+                  +------------------+
          |
          v
+------------------+
|  ThemeManager    |
+------------------+
```

**Dependency flow:**

- `SequenceConverter` -- standalone, no dependencies
- `CodonTable` -- standalone, no dependencies
- `SequenceValidator` -- standalone, no dependencies
- `CanvasRenderer` -- depends on `CodonTable` and `SequenceConverter`
- `UrlHandler` -- standalone, no dependencies
- `ThemeManager` -- standalone, no dependencies
- `ClipboardManager` -- depends on `UrlHandler`

## Source Location

All classes reside in `src/logic/` and can be imported directly:

```typescript
import { SequenceConverter } from "./logic/SequenceConverter";
import { CodonTable } from "./logic/CodonTable";
import { SequenceValidator } from "./logic/SequenceValidator";
import { CanvasRenderer } from "./logic/CanvasRenderer";
import { UrlHandler } from "./logic/UrlHandler";
import { ThemeManager } from "./logic/ThemeManager";
import { ClipboardManager } from "./logic/ClipboardManager";
```

## Quick Example

```typescript
import { SequenceConverter } from "./logic/SequenceConverter";

let converter = new SequenceConverter();
let complement = converter.getDNAComplement("ATGC");
// complement === "TACG"
```

## Shared Types

Several classes reference types defined in `src/types.ts`:

| Type | Definition |
|------|-----------|
| `ConversionType` | `"DNA_COMPLEMENT" \| "DNA_REVERSE_COMPLEMENT" \| "DNA_TRANSCRIPT" \| "RNA_COMPLEMENT" \| "RNA_PROTEIN" \| "DNA_PROTEIN"` |
| `CodonResult` | `{ codon: string; anticodon: string; aminoAcid: string }` |
| `ProteinResult` | `{ codons: CodonResult[]; incomplete: string \| null }` |
| `ValidationResult` | `{ valid: boolean; message: string }` |
| `UrlParseResult` | `{ sequence: string; conversionType: ConversionType }` |
| `ThemeMode` | `"dark" \| "light"` |
