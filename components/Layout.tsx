import { ReactNode } from "react";
import Navigation from "./Navigation";
import styles from "./Layout.module.css";

interface Props {
  title: string
  children: ReactNode;
  reading?: boolean;
}

const Layout = ({children, title, reading}: Props) => {
  return <main className={styles.outer}>
    <section className={`${styles.inner} ${reading ? styles.reading : ''}`}>
      <header className={styles.header}>{title}</header>
      {children}
    </section>
    <Navigation></Navigation>
  </main>
};

export default Layout;
