import Link from "next/link";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.navRow}>
      <Link href="/">Intro</Link>
      <Link href="/writing">Writing</Link>
      <Link href="/projects">Projects</Link>
      <Link href="https://www.linkedin.com/in/zacharysvoboda/">Contact</Link>
    </nav>
  );
};

export default Navigation;
