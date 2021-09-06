import React from "react";
import { CanvasContext } from "../../context/CanvasContext";
import { MenuContext } from "../../context/MenuContext";
import { icons } from "../../icons";
import { ColorPalette } from "../colorPalette";
import { Menu } from "../menu";
import { NavMainToolbar } from "../menu/navMainToolbar";
import { NavPincel } from "../menu/NavPincel";
import styles from "./styles.module.css";
import { ToolbarItem } from "./toolbarItem";

export const Toolbar = () => {
  const { navsToolbar } = React.useContext(MenuContext);
  const { size, grid } = React.useContext(CanvasContext);

  return (
    <div className={`${styles.toolbar} animation_show_opacity`}>
      <div className={styles.container_items_toolbar}>
        {/* <ToolbarItem
        type="menu"
        img={"/menu.svg"}
        hover={"/menu_close.png"}
        isActive={navsToolbar.activeCurrent === "main"}
        hasMenu
        isClickable
        isPrivate
      /> */}

        <div className={styles.items_top}>
          <ToolbarItem type="draw" img={icons.draw} />
          <ToolbarItem type="erase" img={icons.erase} />
          <ToolbarItem
            type="sizePixel"
            img={icons.size_pixel}
            hover={"/menu_close.png"}
            isActive={navsToolbar.activeCurrent === "sizePixel"}
            hasMenu
            isClickable
          />

          {/* <ToolbarItem
        type="gridSize"
        text={`${size}px`}
        hover={"/menu_close.png"}
        isActive={navsToolbar.activeCurrent === "gridSize"}
        hasMenu
        isClickable
      /> */}
          <ToolbarItem
            type="grid"
            img={icons.grid}
            isActive={!grid}
            isClickable
          />
        </div>
        <div className={styles.items_bottom}>

          <ToolbarItem type="save" img={icons.save} isClickable isPrivate />
          <ToolbarItem type="clean" img={icons.clean} isClickable />
          {/* 
      <ToolbarItem type="undo" img={"/undo.svg"} isClickable disabled />
    <ToolbarItem type="redo" img={"/redo.svg"} isClickable disabled /> */}
        </div>
      </div>
      <div className={styles.info_item_toolbar}>
        <ColorPalette />
      </div>
    </div>
  );
};
