import { spawnSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
if (basePath && !/^\/[a-zA-Z0-9_-]+$/.test(basePath)) {
  throw new Error('Use an empty base path or a single repository name starting with /.');
}

const build = spawnSync(process.execPath, ['node_modules/vinext/dist/cli.js', 'build'], {
  cwd: root,
  env: {
    ...process.env,
    DEPLOY_TARGET: 'github-pages',
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  stdio: 'inherit',
});
if (build.error) throw build.error;
const staticIndex = new URL('../dist/client/index.html', import.meta.url);
if (build.status !== 0 && !existsSync(staticIndex)) process.exit(build.status ?? 1);
if (!existsSync(staticIndex)) {
  throw new Error('Static export did not produce dist/client/index.html.');
}
writeFileSync(new URL('../dist/client/.nojekyll', import.meta.url), '');
console.log(`GitHub Pages export ready for ${basePath || '/'}. Publish dist/client only.`);
