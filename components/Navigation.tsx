import Link from "next/link";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.navRow}>
      <Link href="/">Intro</Link>
      <Link href="/writing">Writing</Link>
      <Link href="/projects">Projects</Link>
      <a
        href="https://www.linkedin.com/in/zacharysvoboda/"
        target="_blank"
        rel="noreferrer"
      >
        Contact
      </a>
    </nav>
  );
};

export default Navigation;
