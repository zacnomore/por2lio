import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.root}>
      <Head>
        <title>Zachary Svoboda</title>
        <meta name="description" content="Person" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.intro}>
        <section>
          <p>Hi</p>
        </section>
      </main>
    </div>
  );
};

export default Home;
