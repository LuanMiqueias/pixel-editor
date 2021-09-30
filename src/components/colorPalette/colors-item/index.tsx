import React from "react";
import { ColorsContext } from "../../../context/ColorsContext";
import { ToolBarContext } from "../../../context/ToolBarContext";
import styles from "./styles.module.css";

interface IPropsToolBarItem {
  color: string;
  click?: (color: string) => void;
  delay: number;
}
export const Color = ({ color, delay, click }: IPropsToolBarItem) => {
  const {
    changeColor,
    color: colorSelect,
    handlePickedColor,
  } = React.useContext(ColorsContext);
  const { changeTool } = React.useContext(ToolBarContext);
  return (
    <>
      {color === "pick-color" ? (
        <div
          className={`${styles.pick_color} animation_show_top`}
          style={{ background: color, animationDelay: `.${delay}s` }}
          onClick={() => {
            click(colorSelect);
          }}
        ></div>
      ) : (
        <div
          className={`${styles.item} animation_show_top ${colorSelect === color && styles.item_active
            }`}
          style={{ background: color, animationDelay: `.${delay}s` }}
          onClick={() => {
            changeColor(color);
            changeTool("draw");
          }}
        ></div>
      )}
    </>
  );
};
