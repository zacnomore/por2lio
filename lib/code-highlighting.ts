
import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';
import { Compatible } from 'vfile';

export default async function markdownToHtml(markdown: Compatible) {
  const result = await remark()
    // https://github.com/sergioramos/remark-prism/issues/265
    .use(html, { sanitize: false })
    .use(prism)
    .process(markdown);
  return result.toString();
}