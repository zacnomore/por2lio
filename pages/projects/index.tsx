import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout";
import { getAllWriting } from "../../lib/find-writing";

// TODO: Dedupe
const Projects: NextPage<{ writings: ReturnType<typeof getAllWriting> }> = ({
  writings,
}) => {
  return (
    <Layout title="Projects">
      <section>
        <dl>
          {writings
            .map(({ slug, meta }) => ({
              slug,
              title: meta.title,
              description: meta.description,
              date: meta.date,
            }))
            .map(({ slug, title, description, date }) => (
              <React.Fragment key={slug}>
                <dt>
                  <Link href={"projects/" + slug}>
                    {title} ({date})
                  </Link>
                </dt>
                <dd>{description}</dd>
              </React.Fragment>
            ))}
        </dl>
      </section>
    </Layout>
  );
};

export default Projects;

export async function getStaticProps() {
  return {
    props: {
      writings: getAllWriting("project"),
    },
  };
}
