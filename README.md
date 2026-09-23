<div align="center">

# Galaxy UI

**67 components × 5 frameworks — copy-paste component library, shadcn-style**

[![npm](https://img.shields.io/npm/v/@galaxy-stack/nebula-cli.svg)](https://www.npmjs.com/package/@galaxy-stack/nebula-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/galaxy-nebula/galaxy-design.svg)](https://github.com/galaxy-nebula/galaxy-design/stargazers)
[![MCP Registry](https://img.shields.io/badge/MCP_Registry-listed-blue)](https://registry.modelcontextprotocol.io)

[Docs](https://galaxy-nebula.vercel.app) · [CLI](https://github.com/galaxy-nebula/galaxy-design-cli) · [MCP Server](https://github.com/galaxy-nebula/nebula-mcp) · [Smithery](https://smithery.ai/servers/galaxy-stack/nebula-mcp)

</div>

---

Beautiful, accessible components for **Vue 3, React 18, Angular 20+, React Native, and Flutter** — built on Radix primitives with Tailwind CSS v3/v4 support, from web to mobile.

Following the [shadcn/ui](https://ui.shadcn.com) philosophy: components are **copied into your project** and remain fully editable. No runtime lock-in.

## Framework Parity

| Framework | Components | Styling | Notes |
|---|---|---|---|
| React 18+ | 69 | Radix UI + Tailwind CSS | Reference implementation |
| Vue 3 | 69 | Radix Vue + Tailwind CSS | Full parity with React |
| Angular 20+ | 69 | Radix NG + Tailwind CSS | Standalone components, ControlValueAccessor |
| React Native | 67 | NativeWind | Custom date pickers, NativeWind classes |
| Flutter | 69 | Material Design 3 | Galaxy-prefixed widgets |

**Web-only** (9 components): breadcrumb, command, combobox, dashboard-block, data-table, kbd, toolbar, resizable, scroll-area

## Quick Start

```bash
# Detect your framework and scaffold
npx @galaxy-stack/nebula-cli@latest init

# Add components
npx @galaxy-stack/nebula-cli@latest add button card dialog

# With theme preset
npx @galaxy-stack/nebula-cli@latest init --theme violet
```

## AI-Native

Galaxy UI ships with an **MCP server** and an **AI skill** so AI assistants (Claude, Cursor, Windsurf) can build with Galaxy components using real APIs instead of hallucinated ones.

```json
{
  "mcpServers": {
    "galaxy-ui": {
      "command": "npx",
      "args": ["-y", "@galaxy-stack/nebula-mcp"]
    }
  }
}
```

### AI Skill

The `galaxy-ui` skill (in `skills/`) teaches AI assistants the correct CLI workflow, framework-specific gotchas, and component patterns. Install it into Claude/Codex skills directory or reference it in your prompts.

## Project Structure

```
galaxy-nebula/
├── galaxy-design       ← this repo (source workspace + MCP + skill)
├── galaxy-design-cli   → @galaxy-stack/nebula-cli (npm, command: nebula)
├── nebula-mcp          → @galaxy-stack/nebula-mcp (npm, MCP server)
└── docs-nebula  → docs site (VitePress, galaxy-nebula.vercel.app)
```

## Repository

This is the **source workspace** for all Galaxy UI component implementations, manifests, and contracts. Components are copied into your project via the CLI — they belong to you after installation.

| Directory | Contents |
|---|---|
| `packages/react/` | React components (67) |
| `packages/vue/` | Vue components (69) |
| `packages/angular/` | Angular components (69) |
| `packages/react-native/` | React Native components (67) |
| `packages/flutter/` | Flutter components (69) |
| `packages/contracts/` | Canonical manifests, schemas, generated registries |
| `skills/galaxy-ui/` | AI skill (SKILL.md + references) |

## Links

- **Docs**: https://galaxy-nebula.vercel.app
- **CLI**: `npm install -g @galaxy-stack/nebula-cli`
- **MCP**: `npx @galaxy-stack/nebula-mcp`
- **Smithery**: https://smithery.ai/servers/galaxy-stack/nebula-mcp
- **MCP Registry**: https://registry.modelcontextprotocol.io

## License

MIT © [Bùi Trọng Hiếu (kevinbui)](https://github.com/buikevin)
