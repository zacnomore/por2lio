import type { NextPage } from "next";
import Layout from "../../components/Layout";
import Link from "next/link";
import { getAllWriting } from "../../lib/find-writing";
import React from "react";
import styles from './index.module.css';


const Posts: NextPage<{ writings: ReturnType<typeof getAllWriting> }> = ({writings}) => {
  return (
    <Layout title="Writing">
      <section>
        <dl>
          { writings
            .map(({ slug, meta }) => ({ 
              slug, 
              title: meta.title, 
              description: meta.description,
              date: meta.date
            }))
            .map(({ slug, title, description, date }) => 
              <React.Fragment key={ slug }>
                <dt><Link href={'writing/' + slug}>{ title } ({ date })</Link></dt>
                <dd>{ description }</dd>
              </React.Fragment>
            )}
        </dl>
      </section>
    </Layout>
  );
};

export default Posts;


export async function getStaticProps() {
  return { props: { 
    writings: getAllWriting('blog') 
  } };
}
