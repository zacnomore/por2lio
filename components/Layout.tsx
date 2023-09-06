import { ReactNode } from "react";
import Navigation from "./Navigation";
import styles from "./Layout.module.css";
import TextEffect from "./TextEffect";

interface Props {
  title: string;
  subTitle?: string;
  children?: ReactNode;
}

const Layout = ({ children, title, subTitle }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Navigation></Navigation>
      <main className={styles.outer}>
        <header className={styles.header}>
          <TextEffect text={title}></TextEffect>
          <br />
          {subTitle ? <TextEffect text={subTitle} size="s"></TextEffect> : ""}
        </header>
        <section className={styles.inner}>{children}</section>
      </main>
      <footer className={styles.footer}>
        Copyright 2022 - {new Date().getFullYear()}.{" "}
        <a href="https://github.com/zacnomore/por2lio/blob/main/LICENSE">
          MIT Licensed
        </a>
      </footer>
    </div>
  );
};

export default Layout;
