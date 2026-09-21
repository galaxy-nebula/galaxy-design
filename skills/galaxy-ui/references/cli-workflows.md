# Nebula CLI Workflows

Command: `npx @galaxy-stack/nebula-cli@latest <cmd>` or install globally: `npm install -g @galaxy-stack/nebula-cli` then `nebula <cmd>`.

## init

```bash
npx @galaxy-stack/nebula-cli@latest init [--theme violet|green|blue|default] [-y] [--cwd ./app]
```

Creates `components.json`, scaffolds Tailwind (v4-first, preserves v3), configures aliases, installs dependencies.

## add

```bash
npx @galaxy-stack/nebula-cli@latest add button input dialog
npx @galaxy-stack/nebula-cli@latest add --all
npx @galaxy-stack/nebula-cli@latest add data-table --overwrite   # backup to .galaxy/backups/
npx @galaxy-stack/nebula-cli@latest add toast --registry-url https://galaxy-design.vercel.app/registry/<version>
```

- Auto-installs dependencies (date-fns, vue-sonner, radix packages...)
- `--overwrite` backs up existing files first
- `--registry-url` fetches from a versioned, sha256-verified CDN

## list

```bash
nebula list [--framework react] [--category form]
```

## doctor

```bash
nebula doctor
```

Validates `components.json`, aliases, Tailwind setup, dependencies. Run after any manual config change.

## diff / update

```bash
nebula diff <component>    # local vs registry (unchanged/modified/missing)
nebula update <component>  # re-download (backs up local changes)
```

## migrate tailwind

```bash
nebula migrate tailwind --dry-run   # preview
nebula migrate tailwind --yes       # apply
```

Converts v3 → v4: PostCSS config, CSS-first stylesheet, dependency swap.
