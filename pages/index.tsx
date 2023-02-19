import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Zachary Svoboda</title>
        <meta name="description" content="Person" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout title="Hi, my name is Zac.">
        <p>{`Here you can find my writing that I think is presently helpful or interesting.`}</p>
        <p>{`If you find something that isn't, please reach out so I can improve or remove it.`}</p>
        <p>{`You will find the site is sparse at this particular moment. Every few years I like to refresh it
        as an opportunity to play with new tools and toss out content that I feel no longer represents me.`}</p>
        <p></p>
      </Layout>
    </>
  );
};

export default Home;
