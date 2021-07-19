import React from "react";
import { CanvasContext } from "../../context/CanvasContext";
import styles from "./styles.module.css";

export const Menu: React.FC = () => {
  const { navsToolbar } = React.useContext(CanvasContext);

  return (
    <nav className={`${styles.container}`}>
      {navsToolbar.navs[navsToolbar.activeCurrent] &&
        navsToolbar.navs[navsToolbar.activeCurrent].content}
    </nav>
  );
};
