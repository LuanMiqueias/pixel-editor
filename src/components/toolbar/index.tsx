import React from "react";
import { CanvasContext } from "../../context/CanvasContext";
import { Menu } from "../menu";
import { NavMainToolbar } from "../menu/navMainToolbar";
import { NavPincel } from "../menu/NavPincel";
import styles from "./styles.module.css";
import { ToolbarItem } from "./toolbarItem";

export const Toolbar = () => {
  const { size, grid, navsToolbar } = React.useContext(CanvasContext);
  return (
    <div className={`${styles.toolbar} animation_show_opacity`}>
      <ToolbarItem
        type="menu"
        img={"./menu.svg"}
        hover={"./menu_close.png"}
        isActive={navsToolbar.activeCurrent === "main"}
        hasMenu
        isClickable
      />

      <ToolbarItem type="draw" img={"./draw.svg"} />
      <ToolbarItem type="erase" img={"./erase_dark.svg"} />
      <ToolbarItem
        type="sizePixel"
        img={"./size_pixel.svg"}
        hover={"./menu_close.png"}
        isActive={navsToolbar.activeCurrent === "sizePixel"}
        hasMenu
        isClickable
      />

      <ToolbarItem type="size" text={`${size}`} isClickable />
      <ToolbarItem
        type="grid"
        img={"./grid_on.svg"}
        hover={"./grid_off.svg"}
        isActive={!grid}
        isClickable
      />

      <ToolbarItem type="save" img={"./save.svg"} isClickable />
      <ToolbarItem type="clean" img={"./clean.svg"} isClickable />
    </div>
  );
};
