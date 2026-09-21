#!/usr/bin/env node
/**
 * Build the versioned, immutable registry release artifact.
 */

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const contractsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(contractsRoot, '..', '..');
const generatedRoot = join(contractsRoot, 'generated');

function sha256(content) {
  return createHash('sha256').update(content, 'utf-8').digest('hex');
}

function gitCommit() {
  try {
    return execSync('git rev-parse HEAD', { cwd: repoRoot, encoding: 'utf-8' }).trim();
  } catch { return 'unknown'; }
}

const contractsPkg = JSON.parse(readFileSync(join(contractsRoot, 'package.json'), 'utf-8'));
const version = `${contractsPkg.version}+${gitCommit().slice(0, 12)}`;
const versionDir = join(contractsRoot, 'dist', 'registry', version);
mkdirSync(versionDir, { recursive: true });

const artifactFiles = [
  'registry-react.json', 'registry-vue.json', 'registry-angular.json',
  'registry-react-native.json', 'registry-flutter.json',
  'registry-summary.json', 'coverage.json',
];

const files = {};
for (const fileName of artifactFiles) {
  const sourcePath = join(generatedRoot, fileName);
  if (!existsSync(sourcePath)) throw new Error(`Missing: ${fileName}`);
  const content = readFileSync(sourcePath, 'utf-8');
  files[fileName] = { checksum: sha256(content), size: Buffer.byteLength(content, 'utf-8') };
  writeFileSync(join(versionDir, fileName), content);
}

// Sources
const sourceRoots = {
  react: 'packages/react/src/components',
  vue: 'packages/vue/src/components',
  angular: 'packages/angular/src/components',
  'react-native': 'packages/react-native/src/components',
  flutter: 'packages/flutter/lib/components',
};
const blockRoots = {
  react: 'packages/react/src/blocks',
  vue: 'packages/vue/src/blocks',
  angular: 'packages/angular/src/blocks',
  'react-native': 'packages/react-native/src/blocks',
  flutter: 'packages/flutter/lib/blocks',
};
const assistantRoots = {
  react: 'packages/react/src/assistant',
  vue: 'packages/vue/src/assistant',
  angular: 'packages/angular/src/assistant',
  'react-native': 'packages/react-native/src/assistant',
  flutter: 'packages/flutter/lib/assistant',
};
const BLOCK_CATEGORY = new Set(['blocks', 'mobile-blocks', 'block', 'assistant']);

const sources = {};
for (const framework of ['react', 'vue', 'angular', 'react-native', 'flutter']) {
  const registry = JSON.parse(readFileSync(join(generatedRoot, `registry-${framework}.json`), 'utf-8'));
  for (const [componentId, component] of Object.entries(registry.components)) {
    const isBlock = BLOCK_CATEGORY.has(component.category);
    const isAssistant = component.category === 'assistant';
    const root = isAssistant
      ? join(repoRoot, assistantRoots[framework])
      : isBlock
        ? join(repoRoot, blockRoots[framework])
        : join(repoRoot, sourceRoots[framework]);
    const componentDirName = isBlock ? componentId.replace(/-block$/, '') : componentId;
    if (!Array.isArray(component.files) || component.files.length === 0) continue;
    for (const file of component.files) {
      const abs = join(root, componentDirName, file);
      if (!existsSync(abs)) continue;
      const content = readFileSync(abs, 'utf-8');
      const key = `${framework}/${componentId}/${file}`;
      sources[key] = { checksum: sha256(content), size: Buffer.byteLength(content, 'utf-8') };
      const outPath = join(versionDir, 'sources', framework, componentId, file);
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, content);
    }
  }
}

const checksumList = Object.entries(files).map(([f, m]) => `${f} ${m.checksum}`).sort().join('\n');
const digest = sha256(checksumList);
const manifest = {
  schemaVersion: '1.0.0', version, generatedAt: new Date().toISOString(),
  source: 'packages/contracts/manifests', gitCommit: gitCommit(),
  files, sources, sourcesCount: Object.keys(sources).length, digest,
};
writeFileSync(join(versionDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
writeFileSync(join(contractsRoot, 'dist', 'registry', 'latest-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Registry artifact built: dist/registry/${version}`);
console.log(`Files: ${Object.keys(files).length} (digest ${digest.slice(0, 16)}...)`);
