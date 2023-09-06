import type { NextPage } from "next";
import Layout from "../../components/Layout";
import Link from "next/link";
import { getAllWriting } from "../../lib/find-writing";
import React from "react";
import styles from "../list.module.css";

const Posts: NextPage<{ writings: ReturnType<typeof getAllWriting> }> = ({
  writings,
}) => {
  return (
    <Layout title="Writing">
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
              <Link key={slug} href={"writing/" + slug} className={styles.link}>
                <dt>
                  {title} ({date})
                </dt>
                <dd>{description}</dd>
              </Link>
            ))}
        </dl>
      </section>
    </Layout>
  );
};

export default Posts;

export async function getStaticProps() {
  return {
    props: {
      writings: getAllWriting("blog"),
    },
  };
}
