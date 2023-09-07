import Link from "next/link";
import styles from "./Navigation.module.css";
import { useRouter } from "next/router";

const Navigation = () => {
  const router = useRouter();
  return (
    <nav className={styles.navRow}>
      <Link className={router.pathname === "/" ? styles.active : ""} href="/">
        About
      </Link>
      <Link
        className={router.pathname.includes("/projects") ? styles.active : ""}
        href="/projects"
      >
        Projects
      </Link>
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
