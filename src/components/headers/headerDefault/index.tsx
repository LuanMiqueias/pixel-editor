import Link from "next/link";
import React from "react";
import { icons } from "../../../icons";
import styles from '../styles.module.css';

export const HeaderDefault: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link href='/'>
          <a className={styles.logo}>{icons.logo}</a>
        </Link>
        <nav className={styles.nav}>
          <button>Projects</button>
          <button>Colors</button>

          <button className={styles.button_export}>New Project</button>
        </nav>
      </div>
    </div>
  );
};
