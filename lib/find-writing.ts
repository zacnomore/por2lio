import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const docsDirectory = join(process.cwd(), 'writing');

export function getWritingBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(docsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const serializableMeta = Object.fromEntries(
    Object.entries(data)
      .map(([k, v]) => ([k, k === 'date' ? (new Date(v)).getFullYear() : `${v}`]))
  );

  return { 
    slug: realSlug, 
    meta: serializableMeta, 
    content,
    published: data.published ?? true
  };
}

export function getAllWriting() {
  const slugs = fs.readdirSync(docsDirectory);
  const writings = slugs
    .map((slug) => getWritingBySlug(slug))
    .filter(w => w.published)
    .sort((a, b) => (new Date(a.meta.date)).getTime() - (new Date(b.meta.date)).getTime())
    .reverse()

  return writings;
}
