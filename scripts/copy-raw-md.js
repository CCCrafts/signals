import { mkdirSync, readdirSync, statSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsDir = join(__dirname, '..', 'docs');
const distRaw = join(__dirname, '..', 'docs', '.vitepress', 'dist', 'raw');

function copyMdFiles(srcDir, destDir) {
  const entries = readdirSync(srcDir);
  for (const entry of entries) {
    if (entry === '.vitepress' || entry === 'public' || entry === 'node_modules') continue;
    const srcPath = join(srcDir, entry);
    const stat = statSync(srcPath);
    if (stat.isDirectory()) {
      copyMdFiles(srcPath, join(destDir, entry));
    } else if (entry.endsWith('.md') && entry !== 'index.md') {
      const destPath = join(destDir, entry);
      mkdirSync(dirname(destPath), { recursive: true });
      copyFileSync(srcPath, destPath);
    }
  }
}

mkdirSync(distRaw, { recursive: true });
copyMdFiles(docsDir, distRaw);
console.log('Copied raw markdown files to dist/raw/');
