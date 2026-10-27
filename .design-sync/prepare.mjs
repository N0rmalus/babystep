import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const typesOut = join(root, 'build', 'ts');
const indexDts = join(root, 'index.d.ts');

rmSync(typesOut, { recursive: true, force: true });
rmSync(indexDts, { force: true });

if (process.argv.includes('--clean')) {
  console.log('removed build/ts and index.d.ts');
  process.exit(0);
}

execSync('npx tsc -p .design-sync/tsconfig.dts.json', { cwd: root, stdio: 'inherit' });
writeFileSync(indexDts, "export * from './build/ts/.design-sync/entry';\n");
console.log('wrote build/ts and index.d.ts');

const from = join(here, 'tailwind.css');
const to = join(here, '.cache', 'tailwind.out.css');
const result = await postcss([tailwind({ base: root })]).process(readFileSync(from, 'utf8'), { from, to });
mkdirSync(dirname(to), { recursive: true });
writeFileSync(to, result.css);
console.log(`wrote ${to} (${result.css.length} bytes)`);
