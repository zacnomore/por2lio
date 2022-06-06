import { ReactNode } from "react";
import Navigation from "./Navigation";
import styles from "./Layout.module.css";

interface Props {
  children: ReactNode;
}

const Layout = ({children}: Props) => {
  return <main className={styles.outer}>
    <section className={styles.inner}>
      {children}
    </section>
    <Navigation></Navigation>
  </main>
};

export default Layout;
