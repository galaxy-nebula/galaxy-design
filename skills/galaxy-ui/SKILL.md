---
name: galaxy-ui
description: Guide for building UIs with Galaxy UI components across React, Vue, Angular, React Native, and Flutter. Use when the user asks to create UIs, add components, scaffold projects with the Nebula CLI, style with Tailwind v3/v4, or asks about Galaxy component APIs and patterns. Requires using the Nebula CLI for installation and referencing real component APIs (via MCP tools or docs) before writing code.
version: 1.0.0
---

# Galaxy UI

Galaxy UI is a multi-framework component library (73 React components, 69 Vue/Angular, 67 mobile per framework) built on the shadcn philosophy: components are copied into the user's project and remain fully editable.

Package registry: npm scope `@galaxy-stack`. CLI: `@galaxy-stack/nebula-cli` (command: `nebula`).

This file is the rulebook. Component APIs are **data**, and the companion MCP server
(`@galaxy-stack/nebula-mcp`) serves them from the canonical manifests — never guess props from
shadcn/ui or another library, and never copy a component's source by hand.

## Ground truth

| Need | Call |
|---|---|
| Find a component by intent ("pricing table", "stat card", "searchable select") | `search_components { query }` |
| Every component with its per-framework status | `list_components { framework? }` |
| One component's manifest | `get_component { id, section? }` — `section` is `summary` (default), `props`, `files` or `raw`; prefer a section to stay inside the token budget |
| The real source of one file | `get_component_source { id, framework }` — omit `file` to list the files that are actually bundled, then read one |
| What exists per framework | `get_coverage` |

If `nebula-mcp` is not connected, the docs site is the fallback:
`https://galaxy-nebula.vercel.app/components/<name>` (and `/assistant/overview` for the
`assistant-*` set). Do not infer an API from a screenshot or from another design system.

## Workflow

1. **Detect the user's framework** (React, Vue, Angular, Next.js, Nuxt.js, React Native, Flutter).
2. **Check setup**: run `nebula doctor` (or ask whether `components.json` exists).
3. **Add components**: `nebula add <names>` — supports multiple names, `--all`,
   `--overwrite` (backs up to `.galaxy/backups/`), `--registry-url <url>` for a
   versioned CDN. Always install through the CLI: it also wires dependencies, path aliases and the
   Tailwind/CSS-var tokens, which copying source by hand does not.
4. **Verify**: `nebula doctor` reports alias, dependency and Tailwind problems.

### Use the installed binaries, never `bunx …@latest`

`orbit` (from `@galaxy-stack/orbit-cli`) and `nebula` are already on `PATH` (otherwise
`~/.bun/bin/orbit`). Run them directly — `orbit new gymflow-backend --directory backend`,
`nebula init --yes --theme violet`, `nebula add button card badge`. `bunx`
re-resolves the package from the registry on every call and stalls for minutes when the registry is
slow (measured: 180s, then 300s, then 480s inside one step). If a binary really is missing, prefer
`bunx --offline` or a pinned version with a generous timeout.

## Component selection quick guide

- Forms: `input`, `textarea`, `select`, `checkbox`, `radio-group`, `switch`, `slider`, `form`, `tags-input`, `otp-input`, `combobox` (searchable select)
- Overlays: `dialog`, `alert-dialog`, `sheet`, `popover`, `tooltip`, `dropdown-menu`, `command`
- Data: `table`, `data-table` (React/Vue only), `pagination`, `tabs`, `accordion`, `card`
- Feedback: `alert`, `toast`, `progress`, `spinner`, `skeleton`, `badge`
- Dates: `calendar`, `calendar-range`, `date-picker`, `date-range-picker`, `date-time-picker`, `time-picker`
- Layout: `card`, `separator`, `tabs`, `accordion`, `collapsible`, `resizable`, `scroll-area`, `aspect-ratio`, `toolbar`
- Blocks (composite pages): `login-block`, `pricing-block`, `dashboard-block`, `sidebar`, `chat-ui`, `authentication`, `email`, `featured`
- Assistant UI (React phase 1, for editor webviews/panels): `chat-panel`, `agent-activity`, `diff-review`, `prompt-box`

Web-only components (not on mobile): `breadcrumb`, `command`, `combobox`, `dashboard-block`,
`data-table`, `kbd`, `toolbar`, `resizable`, `scroll-area` — plus all four
`assistant-*` components. `get_coverage` is the authority when a list here is not enough.

## Critical framework notes

Read `references/framework-notes.md` for per-framework gotchas before writing code:

- **Vue**: date components use radix `DateValue` (not native `Date`)
- **Angular**: standalone components, `ui-*` selectors, `ControlValueAccessor` for form controls
- **React Native**: NativeWind classes, no web date libraries
- **Flutter**: Material 3 widgets, `Galaxy` prefix

## Styling

All components use Tailwind + CSS variables (design tokens). Read `references/tailwind.md` for the
v3/v4 setup. Theme presets: `nebula init --theme violet|green|blue|default`.

## Verification

Prove a UI change with bounded tools, not with a running server:

- `validate_project` with `checks: ["build"]` plus `lint`/`typecheck` for the packages you
  touched, and `nebula doctor` for alias, dependency and token wiring.
- Do **not** start `vite`/`npm run dev` as a check: a dev server never exits, produces no
  completion evidence, and any log or probe file it writes is an unreviewed write that invalidates
  the validation it was meant to support. Start a server only when the task explicitly asks to
  exercise the running app — with `run_command`, not by searching for a session tool (this catalog
  has no `manage_session`/preview capability): start it detached, probe the URL with `curl -sf`,
  and stop it before the final validation.
- Props you used must exist in the component's manifest (`get_component { id, section: "props" }`).
