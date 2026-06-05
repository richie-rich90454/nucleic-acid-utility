# ClipboardManager

Class for clipboard operations. It provides methods for copying arbitrary text and for constructing and copying share URLs.

## Constructor

```typescript
constructor()
```

Takes no arguments.

## Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `copyText` | `(text: string): Promise<boolean>` | Copies the given text to the system clipboard using the `navigator.clipboard` API. Returns `true` on success, `false` on failure. |
| `copyShareUrl` | `(sequence: string, conversionType: ConversionType, urlHandler: UrlHandler): Promise<boolean>` | Builds a share URL using the provided `UrlHandler` instance, then copies it to the clipboard. Returns `true` on success, `false` on failure. |

## Browser API

This class uses the `navigator.clipboard` API, which requires a secure context (HTTPS or localhost). Calls will fail and return `false` in insecure contexts or when the user denies clipboard permission.

## Example

```typescript
import { ClipboardManager } from "./logic/ClipboardManager";
import { UrlHandler } from "./logic/UrlHandler";

const clipboard = new ClipboardManager();
const urlHandler = new UrlHandler();

// Copy arbitrary text
const success = await clipboard.copyText("ATGC");
// success === true if copied successfully

// Copy a share URL
const urlSuccess = await clipboard.copyShareUrl("AUG", "RNA_PROTEIN", urlHandler);
// urlSuccess === true if the URL was copied successfully
```
