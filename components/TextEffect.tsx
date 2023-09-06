import styles from "./TextEffect.module.css";
import { ReactNode } from "react";

interface Props {
  text: string;
  size?: "m" | "s";
}

const TextEffect = ({ text, size = "m" }: Props) => {
  return (
    <p className={`${styles.text} ${styles[size]}`} data-text={text}>
      {text}
    </p>
  );
};

export default TextEffect;
