/**
 * Remark plugin: Docusaurus's transformImage runs escape-html on the alt and title of a Markdown
 * image, and React escapes the attribute again. So `![The "x"](a.png)` gives alt="The &amp;quot;x..."
 * and a screen reader reads "&quot;". This plugin runs after the default plugins and undoes the
 * first escape, so React escapes once.
 */
const ENTITIES: Record<string, string> = {'&quot;': '"', '&#39;': "'", '&lt;': '<', '&gt;': '>', '&amp;': '&'};
const IMAGE_TEXT = new Set(['alt', 'title']);

type Node = {type?: string; name?: string | null; attributes?: Attribute[]; children?: Node[]};
type Attribute = {type?: string; name?: string; value?: unknown};

export function unescapeHtml(text: string): string {
  return text.replace(/&(?:quot|#39|lt|gt|amp);/g, (entity) => ENTITIES[entity]);
}

function visit(node: Node): void {
  if ((node.type === 'mdxJsxTextElement' || node.type === 'mdxJsxFlowElement') && node.name === 'img') {
    for (const attribute of node.attributes ?? []) {
      if (attribute.type === 'mdxJsxAttribute' && IMAGE_TEXT.has(attribute.name ?? '') && typeof attribute.value === 'string') {
        attribute.value = unescapeHtml(attribute.value);
      }
    }
  }
  node.children?.forEach(visit);
}

export default function unescapeImageText() {
  return (tree: Node) => visit(tree);
}
