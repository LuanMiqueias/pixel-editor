import React from "react";
import { ColorsContext } from "../../../context/ColorsContext";
import { ToolBarContext } from "../../../context/ToolBarContext";
import styles from "./styles.module.css";

interface IPropsToolBarItem {
  color: string;
  click?: (color: string) => void;
}
export const Color = ({ color, click }: IPropsToolBarItem) => {
  const {
    changeColor,
    color: colorSelect,
    handlePickedColor,
  } = React.useContext(ColorsContext);
  const { changeTool } = React.useContext(ToolBarContext);
  return (
    <div className={styles.container}>
      {color === "pick-color" ? (
        <div
          className={`${styles.pick_color}`}
          style={{ background: color }}
          onClick={() => {
            click(colorSelect);
          }}
        ></div>
      ) : (
        <div
          className={`${styles.item} animation_show_opacity ${
            colorSelect === color && styles.item_active
          }`}
          style={{ background: color }}
          onClick={() => {
            changeColor(color);
            changeTool("draw");
          }}
        ></div>
      )}
    </div>
  );
};
