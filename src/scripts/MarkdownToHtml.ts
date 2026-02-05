import markdownit from 'markdown-it';

export function renderExcerpt(markdown: string) {
  const match = markdown.match(
    /\{\s*\/\*\s*start\s*\*\/\s*\}([\s\S]*?)\{\s*\/\*\s*end\s*\*\/\s*\}/,
  );

  if (!match) return '';

  const md = new markdownit();
  md.renderer.rules.link_open = () => '';
  md.renderer.rules.link_close = () => '';

  return md.render(match[1].trim());
}
