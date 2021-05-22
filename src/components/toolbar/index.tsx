import React from "react";
import { CanvasContext } from "../../context/CanvasContext";
import { CellsContext } from "../../context/CellsContext";
import styles from "./styles.module.css";
import { ToolbarItem } from "./toolbarItem";

export const Toolbar = () => {
  const { size } = React.useContext(CanvasContext);
  return (
    <div className={styles.toolbar}>
      <ToolbarItem type="draw" img={"./draw.svg"} />
      <ToolbarItem type="erase" img={"./erase_dark.svg"} />

      <ToolbarItem type="size" text={`${size}`} toolCustom />
      <ToolbarItem type="save" img={"./save.svg"} toolCustom />
      <ToolbarItem type="clean" img={"./clean.svg"} toolCustom />
    </div>
  );
};
