import Link from "next/link";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.navRow}>
      <Link href="/">Intro</Link>
      <Link href="/posts">Posts</Link>
      <Link href="/projects">Projects</Link>
    </nav>
  );
};

export default Navigation;
