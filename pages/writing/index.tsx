import type { NextPage } from "next";
import Layout from "../../components/Layout";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";


const Posts: NextPage<{writings: {
  data: {};
  content: string;
  slug: string;
}[]}> = ({writings}) => {
  return (
    <Layout title="Writing">
      <section>
        {writings.map(w => w.slug).map(s => <Link key={s} href={'writing/' + s}>{s}</Link>)}
      </section>
    </Layout>
  );
};

export const getStaticProps = () => {

  const files = fs.readdirSync(path.join(process.cwd(), "pages", "writing"), {
    withFileTypes: true,
  });

  const writings = files
    .map((f) => {
      if (!f.name.endsWith(".mdx")) return;

      const contents = fs.readFileSync(
        path.join(process.cwd(), "pages", "writing", f.name),
        "utf-8"
      );
      const { data, content } = matter(contents);

      const slug = f.name.replace(/.mdx$/, "");
      return { data, content, slug };
    })
    .filter((post) => post);

    return {
      props: {
        writings
      }
    }
}

export default Posts;
