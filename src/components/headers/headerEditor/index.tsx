import Link from "next/link";
import React from "react";
import { CanvasContext } from "../../../context/CanvasContext";
import { UserContext } from "../../../context/UserContext";
import { icons } from "../../../icons";
import styles from '../styles.module.css';

export const HeaderEditor: React.FC = () => {
  const { auth, user } = React.useContext(UserContext);
  const { downloadCanvas, canvasIsBlank } = React.useContext(CanvasContext);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link href='/'>
          <a className={styles.logo}>{icons.logo}</a>
        </Link>
        <nav className={styles.nav}>
          <Link href={auth ? '/user' : '/signin'}>
            <a>My Projects</a>
          </Link>
          <button>File</button>
          <button>Edit</button>
          <button>View</button>
          <button>Settings</button>

          <button className={styles.button_export} onClick={downloadCanvas}
            disabled={canvasIsBlank}>Export Project</button>
        </nav>
      </div>
    </div>
  );
};
