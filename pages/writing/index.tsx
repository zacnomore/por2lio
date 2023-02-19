import type { NextPage } from "next";
import Layout from "../../components/Layout";
import Link from "next/link";
import { getAllWriting } from "../../lib/find-writing";


const Posts: NextPage<{writings: {
  data: {};
  content: string;
  slug: string;
}[]}> = ({writings}) => {
  return (
    <Layout title="Writing">
      <section>
        <ul>
          {writings.map(w => w.slug).map(s => <li key={s}><Link href={'writing/' + s}>{s}</Link></li>)}
        </ul>
      </section>
    </Layout>
  );
};

export default Posts;


export async function getStaticProps() {
  return { props: { 
    writings: getAllWriting() 
  } };
}
