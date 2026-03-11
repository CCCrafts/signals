import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsDir = join(__dirname, '..', 'docs');
const distDir = join(__dirname, '..', 'docs', '.vitepress', 'dist');

const sections = [];

function collectMd(dir) {
  const entries = readdirSync(dir).sort();
  for (const entry of entries) {
    if (entry === '.vitepress' || entry === 'public' || entry === 'node_modules') continue;
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      collectMd(fullPath);
    } else if (entry.endsWith('.md') && entry !== 'index.md') {
      const relPath = relative(docsDir, fullPath);
      const content = readFileSync(fullPath, 'utf-8');
      sections.push(`<!-- file: ${relPath} -->\n${content}`);
    }
  }
}

collectMd(docsDir);

const output = `# signals.actor API — Full Documentation

> This file contains the complete API documentation concatenated for LLM ingestion.
> Source: https://docs.signals.actor
> Raw markdown files: https://docs.signals.actor/raw/

${sections.join('\n\n---\n\n')}
`;

writeFileSync(join(distDir, 'llms-full.txt'), output);
console.log(`Generated llms-full.txt (${sections.length} sections)`);
