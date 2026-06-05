# SequenceValidator

Class for validating nucleotide sequences. It determines whether a given sequence contains only valid bases for the specified conversion type and provides both full and real-time validation modes.

## Constructor

```typescript
constructor()
```

Takes no arguments. Initializes the list of valid DNA and RNA bases.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `dnaBases` | `string[]` | Valid DNA bases: `["A", "T", "G", "C"]` |
| `rnaBases` | `string[]` | Valid RNA bases: `["A", "U", "G", "C"]` |

## Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `validate` | `(sequence: string, conversionType: ConversionType): ValidationResult` | Validates the full sequence against the allowed bases for the given conversion type. Returns a `ValidationResult` with `valid: true` and an empty message on success, or `valid: false` with a descriptive error message on failure. An empty string is considered valid. |
| `isValidRealTime` | `(sequence: string, conversionType: ConversionType): boolean` | Returns `true` if every character in the sequence is a valid base for the given conversion type. Intended for use during user input (e.g., `onInput` handlers) where a boolean result is preferred over a structured validation result. |
| `getBasesForType` | `(conversionType: ConversionType): string[]` | Returns the array of valid bases for the conversion type. DNA types return `dnaBases`; RNA types return `rnaBases`. |

## Types

### ValidationResult

```typescript
interface ValidationResult {
  valid: boolean;
  message: string;
}
```

- `valid` -- whether the sequence passes validation
- `message` -- error description when `valid` is `false`, empty string when `valid` is `true`

## Example

```typescript
import { SequenceValidator } from "./logic/SequenceValidator";

const validator = new SequenceValidator();

// Full validation
const result = validator.validate("ATXG", "DNA_COMPLEMENT");
// result.valid === false
// result.message === "Invalid DNA sequence. Only A, T, G, C characters are allowed."

const validResult = validator.validate("ATGC", "DNA_COMPLEMENT");
// validResult.valid === true
// validResult.message === ""

// Real-time validation
const isValid = validator.isValidRealTime("AUG", "RNA_COMPLEMENT");
// isValid === true

// Get bases for a type
const bases = validator.getBasesForType("RNA_PROTEIN");
// bases === ["A", "U", "G", "C"]
```
