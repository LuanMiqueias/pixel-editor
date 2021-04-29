import React from "react";
import { ColorsContext } from "../../../context/ColorsContext";
import { ToolBarContext } from "../../../context/ToolBarContext";
import styles from "./styles.module.css";

interface IPropsToolBarItem {
  color: string;
}
export const Color = ({ color }: IPropsToolBarItem) => {
  const { changeColor, color: colorSelect } = React.useContext(ColorsContext);
  const { changeTool } = React.useContext(ToolBarContext);
  return (
    <div
      className={`${styles.item} ${
        colorSelect === color && styles.item_selected
      }`}
      style={{ background: color }}
      onClick={() => {
        changeColor(color);
        changeTool("draw");
      }}
    ></div>
  );
};
