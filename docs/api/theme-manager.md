# ThemeManager

Class for managing dark/light theme preference. It persists the user's choice in `localStorage` and applies it via the `data-theme` attribute on the root `<html>` element.

## Constructor

```typescript
constructor()
```

Takes no arguments.

## Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `init` | `(): void` | Reads the stored theme from `localStorage`. If a value exists, applies it. If not, checks the system preference via `prefers-color-scheme` and applies `"dark"` if the user prefers dark mode. Does nothing if the system prefers light mode (the default). |
| `toggle` | `(): void` | Switches between `"dark"` and `"light"` modes. Updates the `data-theme` attribute on the `<html>` element and persists the new value to `localStorage`. |
| `getCurrent` | `(): ThemeMode` | Returns the current theme by reading the `data-theme` attribute from the `<html>` element. Returns `"light"` if the attribute is not set or has an unrecognized value. |
| `isDarkPreferred` | `(): boolean` | Returns `true` if the user's operating system or browser reports a preference for dark color schemes via the `prefers-color-scheme` media query. |
| `getIcon` | `(): string` | Returns an HTML entity string for the theme toggle icon. Returns `"&#9788;"` (sun) when the current theme is dark, and `"&#9790;"` (moon) when the current theme is light. |

## Types

### ThemeMode

```typescript
type ThemeMode = "dark" | "light";
```

## Storage

- **localStorage key**: `"theme"`
- **DOM attribute**: `data-theme` on the `<html>` element

## Example

```typescript
import { ThemeManager } from "./logic/ThemeManager";

const theme = new ThemeManager();

// Initialize on application startup
theme.init();

// Toggle the theme
theme.toggle();

// Check current theme
const current = theme.getCurrent();
// current === "dark" or "light"

// Get the icon for the toggle button
const icon = theme.getIcon();
// icon === "&#9788;" or "&#9790;"
```
