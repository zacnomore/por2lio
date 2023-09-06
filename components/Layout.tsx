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
    <div className={styles.typography}>
      <Navigation></Navigation>
      <main className={styles.outer}>
        <header className={styles.header}>
          <TextEffect text={title}></TextEffect>
          <br />
          {subTitle ? <TextEffect text={subTitle} size="s"></TextEffect> : ""}
        </header>
        <section className={styles.inner}>{children}</section>
      </main>
    </div>
  );
};

export default Layout;
