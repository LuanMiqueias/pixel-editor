import Link from "next/link";
import React from "react";
import { UserContext } from "../../../context/UserContext";
import { icons } from "../../../icons";
import styles from '../styles.module.css';

export const HeaderDefault: React.FC = () => {
  const { auth, user } = React.useContext(UserContext);
  console.log(user)
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link href='/'>
          <a className={styles.logo}>{icons.logo}</a>
        </Link>
        <nav className={styles.nav}>
          {auth && <>
            <button>My Account</button>
            {/* <button>Projects</button> */}
            <button>Colors</button>

          </>}
          <Link href='/editor'>
            <button className={styles.button_export}>New Project</button>
          </Link>
        </nav>
      </div>
    </div>
  );
};
