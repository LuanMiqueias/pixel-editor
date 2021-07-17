import React from "react";
import { CanvasContext } from "../../context/CanvasContext";
import { Menu } from "../menu";
import styles from "./styles.module.css";
import { ToolbarItem } from "./toolbarItem";

export const Toolbar = () => {
  const { size, grid, menu } = React.useContext(CanvasContext);
  return (
    <div className={`${styles.toolbar} animation_show_opacity`}>
      <ToolbarItem
        type="menu"
        img={"./menu.svg"}
        hover={"./menu_close.png"}
        isActive={menu}
        isClickable
      />

      <ToolbarItem type="draw" img={"./draw.svg"} />
      <ToolbarItem type="erase" img={"./erase_dark.svg"} />

      <ToolbarItem
        type="grid"
        img={"./grid_on.svg"}
        hover={"./grid_off.svg"}
        isActive={!grid}
        isClickable
      />

      <ToolbarItem type="size" text={`${size}`} isClickable />
      <ToolbarItem type="save" img={"./save.svg"} isClickable />
      <ToolbarItem type="clean" img={"./clean.svg"} isClickable />
      <Menu />
    </div>
  );
};
