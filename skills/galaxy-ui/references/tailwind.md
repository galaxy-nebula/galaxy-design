# Tailwind v3 vs v4

Galaxy supports both. `nebula init` auto-detects; `nebula doctor` verifies.

## v4 (default)

- PostCSS: single plugin `@tailwindcss/postcss`
- Stylesheet: `@import "tailwindcss"; @import "tw-animate-css";` + `@custom-variant dark` + `@theme inline` token bridge
- Deps: `tailwindcss@4`, `tw-animate-css`, `tailwind-merge@3`
- Dark mode: `@custom-variant dark (&:is(.dark *));`

## v3

- `tailwind.config.js` with content globs, `darkMode: ['class']`
- Deps: `tailwindcss@3.4`, `tailwindcss-animate`, `autoprefixer`, `tailwind-merge@2`

## Design tokens

CSS variables (`--background`, `--primary`...) under `:root` and `.dark` are identical between v3/v4 — components map them via semantic utilities. Theme presets change only the variable values.

## Migration

`nebula migrate tailwind --dry-run` then `--yes`. Never round-trip v4 → v3.
