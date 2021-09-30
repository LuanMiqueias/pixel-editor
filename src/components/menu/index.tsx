import React from "react";
import { MenuContext } from "../../context/MenuContext";
import styles from "./styles.module.css";

export const Menu: React.FC = () => {
  const { navsToolbar } = React.useContext(MenuContext);

  return (
    <nav className={`${styles.container}`}>

      {!navsToolbar.activeCurrent ? navsToolbar.default.map(item => navsToolbar.navs[item]?.content) : navsToolbar.activeCurrent.map(item => navsToolbar.navs[item]?.content)}
    </nav>
  );
};
