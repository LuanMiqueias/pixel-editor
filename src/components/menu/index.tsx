import React from "react";
import { MenuContext } from "../../context/MenuContext";
import styles from "./styles.module.css";

export const Menu: React.FC = () => {
  const { navsToolbar } = React.useContext(MenuContext);

  return (
    <nav className={`${styles.container}`}>
      {navsToolbar.navs[navsToolbar.activeCurrent] &&
        navsToolbar.navs[navsToolbar.activeCurrent].content}
    </nav>
  );
};
