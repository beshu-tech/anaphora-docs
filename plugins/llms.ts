import fs from 'fs';
import path from 'path';
import type {Plugin} from '@docusaurus/types';

/**
 * Build-time LLM support for the stable docs:
 *  - /llms.txt        index of pages with one-line descriptions (llmstxt.org)
 *  - /llms-full.txt   all pages in one Markdown file
 *  - /<page>.md       Markdown source of every page
 */
const SITE = 'https://docs.anaphora.it';
const SRC = 'versioned_docs/version-stable';

type Page = {slug: string; title: string; description: string; body: string};

function walk(dir: string): string[] {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : p.endsWith('.md') || p.endsWith('.mdx') ? [p] : [];
  });
}

function parse(file: string, root: string): Page {
  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const front = m?.[1] ?? '';
  const body = raw.slice(m?.[0].length ?? 0).replace(/^import .*$/gm, '').trim();
  const get = (k: string) =>
    front.match(new RegExp(`^${k}:\\s*["']?(.*?)["']?\\s*$`, 'm'))?.[1] ?? '';
  const title = get('title') || body.match(/^#\s+(.+)$/m)?.[1] || path.basename(file);
  let slug = path.relative(root, file).replace(/\.mdx?$/, '');
  slug = slug.replace(/(^|\/)index$/, '').replace(/\/$/, '');
  return {slug, title, description: get('description'), body};
}

export default function llmsPlugin(): Plugin {
  return {
    name: 'anaphora-llms',
    async postBuild({outDir, siteDir}) {
      const root = path.join(siteDir, SRC);
      const pages = walk(root)
        .map((f) => parse(f, root))
        .sort((a, b) => a.slug.localeCompare(b.slug));
      const link = (p: Page) => `${SITE}/${p.slug}`;

      for (const p of pages) {
        const target = path.join(outDir, `${p.slug || 'index'}.md`);
        fs.mkdirSync(path.dirname(target), {recursive: true});
        fs.writeFileSync(target, `# ${p.title}\n\nSource: ${link(p)}\n\n${p.body}\n`);
      }

      const index = pages
        .map((p) => `- [${p.title}](${link(p)}.md)${p.description ? `: ${p.description}` : ''}`)
        .join('\n');
      fs.writeFileSync(
        path.join(outDir, 'llms.txt'),
        `# Anaphora Documentation\n\n> Anaphora is a self-hostable reporting and alerting system. It turns authenticated Kibana, Grafana and web dashboards into scheduled PDF reports and alerts, delivered by email, Slack, webhook or S3.\n\nEvery link below is the Markdown source of a page. The full text of all pages is in [llms-full.txt](${SITE}/llms-full.txt).\n\n## Pages\n\n${index}\n`,
      );
      fs.writeFileSync(
        path.join(outDir, 'llms-full.txt'),
        pages.map((p) => `# ${p.title}\n\nSource: ${link(p)}\n\n${p.body}`).join('\n\n---\n\n') + '\n',
      );
    },
  };
}
