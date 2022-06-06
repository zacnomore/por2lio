import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <main className={styles.root}>
      <Head>
        <title>Zachary Svoboda</title>
        <meta name="description" content="Person" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>Hello</section>
    </main>
  )
}

export default Home
