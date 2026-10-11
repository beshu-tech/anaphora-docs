// Fails the build when an image alt or title in the HTML output is escaped twice
// (`&amp;quot;`): a screen reader then reads the entity aloud. See plugins/unescapeImageText.ts.
import fs from 'fs';
import path from 'path';

const DOUBLE = /<img\b[^>]*\b(?:alt|title)="[^"]*&amp;(?:quot|#39|lt|gt|amp);/g;
const walk = (dir) =>
  fs.readdirSync(dir, {withFileTypes: true}).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });

const bad = walk('build').flatMap((file) => (fs.readFileSync(file, 'utf8').match(DOUBLE) ?? []).map((m) => `${file}: ${m.slice(0, 160)}`));
if (bad.length) {
  console.error(`Image text escaped twice in ${bad.length} place(s):\n${bad.join('\n')}`);
  process.exit(1);
}
console.log('Image alt and title text: escaped once.');
