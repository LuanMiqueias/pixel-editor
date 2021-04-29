import React from "react";
import { ColorsContext } from "../../context/ColorsContext";
import { ToolBarContext } from "../../context/ToolBarContext";
import styles from "./styles.module.css";
import { ToolbarItem } from "./toolbarItem";

export const Toolbar = () => {
  const { tool } = React.useContext(ToolBarContext);
  return (
    <div className={styles.toolbar}>
      <ToolbarItem type="draw" img={"/draw_dark.svg"} />

      <ToolbarItem type="erase" img={"/erase_dark.svg"} />
    </div>
  );
};
