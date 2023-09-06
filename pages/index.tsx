import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Zachary Svoboda</title>
        <meta
          name="description"
          content="Person, capable of some things and not others"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout title="Zachary Svoboda" subTitle="Frontend Developer">
        <p>
          Welcome to my portfolio. My name is Zac, I&apos;ve been a developer
          for {new Date().getFullYear() - 2016} years. I often work with Angular
          and Typescript although I cultivate an interest in a number of web
          technologies; this site is built with Next.js for example.
        </p>
        <p>
          I enjoy contributing to open source, I&apos;m proud to have landed
          some contributions to the Firefox browser devtools. When I&apos;m not
          coding I like to garden and cook with my wife, nap with my cat and
          play chess online.
        </p>
      </Layout>
    </>
  );
};

export default Home;
