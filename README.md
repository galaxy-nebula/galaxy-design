# Galaxy UI Source Workspace

This repository is the source workspace for Galaxy UI component packages and shared implementations.

It is not the same thing as the published CLI package. The copy-paste product surface lives in [`@galaxy-stack/nebula-cli`](https://github.com/galaxy-nebula/galaxy-design-cli), where users run `nebula init` and `nebula add` to fetch component source from the registry CDN and scaffold editable files into their apps.

## Scope

This workspace currently contains:

- source code for React, Vue, and Angular component packages
- shared workspace dependencies and package metadata
- framework-specific build, lint, and test configuration
- source entries used by the custom `@galaxy-ui/source` export condition

It does not currently contain standalone published packages for Next.js or Nuxt.js.

- `nextjs` is a CLI/runtime target that maps to the React source package
- `nuxtjs` is a CLI/runtime target that maps to the Vue source package

## Workspace Structure

Key packages under `packages/`:

- `@galaxy-ui/react`
- `@galaxy-ui/vue`
- `@galaxy-ui/angular`
- additional workspace packages such as React Native and Flutter as they evolve

When the CLI reports support for Next.js or Nuxt.js, that support comes from framework-specific transforms on top of the React or Vue package sources in this workspace.

The root workspace uses Bun workspaces:

```bash
bun install
```

## Current Package Status

### React

`@galaxy-ui/react` is currently the most publish-ready package in this workspace.

- root source entry exists at `packages/react/src/index.ts`
- builds JavaScript and declarations
- verifies with `npm run build` and `npm pack --dry-run`
- still has internal typing debt, but current publish artifacts are generated successfully

### Vue

`@galaxy-ui/vue` now has a real library build pipeline.

- root source entry exists at `packages/vue/src/index.ts`
- builds with `vite build && vue-tsc -p tsconfig.build.json`
- package manifest points at real `dist/*` artifacts
- should be treated as a package with an actual build, not as source-only placeholder metadata

### Angular

`@galaxy-ui/angular` now has a real Angular library build pipeline.

- root source entry exists at `packages/angular/src/index.ts`
- builds with `ng build galaxy-ui-angular`
- package manifest points at real Angular package artifacts in `dist/`
- metadata is aligned to the `buikevin/galaxy-design` repository
- some export-surface cleanup may still be needed, but this is no longer a fake or intentionally failing build story

## Tailwind Support

Do not treat this repository as locked to Tailwind CSS v3.

- the workspace lockfile already includes Tailwind v4-era dependencies
- component source should be evaluated against both v3 and v4 compatibility expectations
- the CLI strategy is v4-first for new installs while preserving existing v3 projects

## Development Commands

From the repository root:

```bash
bun install
npm run lint
npm run test
```

Package-specific examples:

```bash
cd packages/react && npm run build
cd packages/react && npm pack --dry-run
cd packages/vue && npm run build
cd packages/angular && npm run build
```

## Publish Readiness Policy

Use this rule of thumb when working in this repo:

- if a package manifest claims `dist/index.js`, `dist/index.d.ts`, or equivalent Angular output, the workspace must be able to build and pack those files
- package metadata, README status, and actual artifacts must move together
- if a package is not meant to be publishable yet, do not advertise missing artifacts in its manifest

## Relationship To The CLI

The copy-paste user experience lives in `galaxy-design-cli`, not in this repository root.

That means:

- CLI docs should stay in the CLI repo/package
- this README should describe the source workspace and package status
- user-facing `init` and `add` behavior should be documented where the CLI is published

## Near-Term Priorities

- keep `@galaxy-ui/react` build and pack verification green
- keep Vue and Angular build metadata aligned with actual emitted artifacts
- add stronger publish verification and smoke import checks per package
- continue normalizing docs and manifests around the real copy-paste product model

## Repository

- Homepage: `https://galaxy-nebula.vercel.app`
- Repository: `https://github.com/galaxy-nebula/galaxy-design`
- Issues: `https://github.com/galaxy-nebula/galaxy-design/issues`
