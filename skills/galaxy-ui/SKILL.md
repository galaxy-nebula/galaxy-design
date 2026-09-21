---
name: galaxy-ui
description: Guide for building UIs with Galaxy UI components across React, Vue, Angular, React Native, and Flutter. Use when the user asks to create UIs, add components, scaffold projects with the Nebula CLI, style with Tailwind v3/v4, or asks about Galaxy component APIs and patterns. Requires using the Nebula CLI for installation and referencing real component APIs (via MCP tools or docs) before writing code.
---

# Galaxy UI

Galaxy UI is a multi-framework component library (67 components × 5 frameworks: React, Vue, Angular, React Native, Flutter) built on the shadcn philosophy: components are copied into the user's project and remain fully editable.

Package registry: npm scope `@galaxy-stack`. CLI: `@galaxy-stack/nebula-cli` (command: `nebula`).

## Ground truth rule

**Before writing any component code**, verify the real API:

- Use the MCP tools (`get_component`, `get_component_source`) if the `nebula-mcp` server is connected
- Otherwise check https://galaxy-design.vercel.app/components/<name>

Never guess props from shadcn/ui or other libraries — Galaxy has its own contracts (documented per component in the docs pages).

## Workflow

1. **Detect the user's framework** (React, Vue, Angular, Next.js, Nuxt.js, React Native, Flutter)
2. **Check setup**: run `nebula doctor` (or ask if `components.json` exists)
3. **Add components**: `npx @galaxy-stack/nebula-cli@latest add <names>` — supports multiple names, `--all`, `--overwrite` (backs up to `.galaxy/backups/`), `--registry-url <url>` for versioned CDN
4. **Verify**: `nebula doctor` reports alias, dependency, and Tailwind issues

## Component selection quick guide

- Forms: `input`, `textarea`, `select`, `checkbox`, `radio-group`, `switch`, `slider`, `form`, `tags-input`, `otp-input`, `combobox` (searchable select)
- Overlays: `dialog`, `alert-dialog`, `sheet`, `popover`, `tooltip`, `dropdown-menu`, `command`
- Data: `table`, `data-table` (React/Vue only), `pagination`, `tabs`, `accordion`, `card`
- Feedback: `alert`, `toast`, `progress`, `spinner`, `skeleton`, `badge`
- Dates: `calendar`, `calendar-range`, `date-picker`, `date-range-picker`, `date-time-picker`, `time-picker`
- Layout: `card`, `separator`, `tabs`, `accordion`, `collapsible`, `resizable`, `scroll-area`, `aspect-ratio`, `toolbar`
- Blocks (composite pages): `login-block`, `pricing-block`, `dashboard-block`, `sidebar`, `chat-ui`

Web-only components (not on mobile): `breadcrumb`, `command`, `combobox`, `dashboard-block`, `data-table`, `kbd`, `toolbar`, `resizable`, `scroll-area`.

## Critical framework notes

Read `references/framework-notes.md` for per-framework gotchas before writing code:

- **Vue**: date components use radix `DateValue` (not native `Date`)
- **Angular**: standalone components, `ui-*` selectors, `ControlValueAccessor` for form controls
- **React Native**: NativeWind classes, no web date libraries
- **Flutter**: Material 3 widgets, `Galaxy` prefix

## Styling

All components use Tailwind + CSS variables (design tokens). Read `references/tailwind.md` for v3/v4 setup. Theme presets: `nebula init --theme violet|green|blue|default`.

## AI data access (MCP)

If the user has the `nebula-mcp` server connected, prefer its tools for live data over this skill's references — they are generated from canonical manifests and always current.
