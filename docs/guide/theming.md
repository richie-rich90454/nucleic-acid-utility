# Theming

The application supports both dark and light visual themes.

## Default Behavior

On first visit, the theme follows the user's operating system preference via the `prefers-color-scheme` media query. If the system reports a preference for dark mode, the dark theme is applied; otherwise, the light theme is used.

## Manual Toggle

A theme toggle button is located in the application header. Clicking it switches between dark and light modes. The selected preference is persisted in `localStorage` and restored on subsequent visits.

## CSS Custom Properties

Theming is implemented through CSS custom properties defined on the root element. The following properties are used throughout the application:

| Property | Purpose |
|----------|---------|
| `--bg` | Page background color |
| `--surface` | Card and panel background color |
| `--text` | Primary text color |
| `--primary` | Primary accent color |
| `--primary-hover` | Primary accent color on hover |
| `--border` | Border color |
| `--error` | Error state color |
| `--success` | Success state color |

Switching themes updates these properties, and all components that reference them re-render with the new values.

## Manual Override

The active theme can be forced by setting the `data-theme` attribute on the `<html>` element:

```html
<html data-theme="dark">
```

```html
<html data-theme="light">
```

This overrides both the system preference and the `localStorage` value. Removing the attribute restores the default resolution order.

## Accessibility

The application respects the following user preference media queries:

- **`prefers-reduced-motion`** - When enabled, CSS transitions and animations are disabled or reduced in duration.
- **`prefers-contrast: high`** - When enabled, border widths and color contrasts are increased to improve readability.
