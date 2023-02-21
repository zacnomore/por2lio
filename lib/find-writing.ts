import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const blogDirectory = join(process.cwd(), "writing");
const projectsDirectory = join(process.cwd(), "projects");

const directory = (type: "blog" | "project") =>
  type === "blog" ? blogDirectory : projectsDirectory;

export function getWritingBySlug(slug: string, type: "blog" | "project") {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(directory(type), `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const serializableMeta = Object.fromEntries(
    Object.entries(data).map(([k, v]) => [
      k,
      k === "date" ? new Date(v).getFullYear() : `${v}`,
    ])
  );

  return {
    slug: realSlug,
    meta: serializableMeta,
    content,
    published: data.published ?? true,
  };
}

export function getAllWriting(type: "blog" | "project") {
  const slugs = fs.readdirSync(directory(type));
  const writings = slugs
    .map((slug) => getWritingBySlug(slug, type))
    .filter((w) => w.published)
    .sort(
      (a, b) =>
        new Date(a.meta.date).getTime() - new Date(b.meta.date).getTime()
    )
    .reverse();

  return writings;
}
