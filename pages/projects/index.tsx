import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout";
import { getAllWriting } from "../../lib/find-writing";
import styles from "../list.module.css";

// TODO: Dedupe
const Projects: NextPage<{ writings: ReturnType<typeof getAllWriting> }> = ({
  writings,
}) => {
  return (
    <Layout title="Projects">
      <section>
        <p>
          Upon reflection, I have decided to focus my efforts on open source
          rather than personal projects. While these works may not be as
          interesting to present as something I create on my own, I am looking
          to make an impact, however small, and I must admit that working alone
          on hobby ideas is not effective in that.
        </p>
        <p>
          I have left one of my more recent projects here but I look forward to
          sharing some of my community work in the future. If you would like to
          see that work as it happens, I am currently focused on the Firefox
          Devtools; here is{" "}
          <a href="https://bugzilla.mozilla.org/user_profile?user_id=646968">
            my bugzilla profile.
          </a>
        </p>
        <br />
        <dl>
          {writings
            .map(({ slug, meta }) => ({
              slug,
              title: meta.title,
              description: meta.description,
              date: meta.date,
            }))
            .map(({ slug, title, description, date }) => (
              <Link
                key={slug}
                href={"projects/" + slug}
                className={styles.link}
              >
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

export default Projects;

export async function getStaticProps() {
  return {
    props: {
      writings: getAllWriting("project"),
    },
  };
}
