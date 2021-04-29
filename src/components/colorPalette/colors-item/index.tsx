import React from "react";
import { ColorsContext } from "../../../context/ColorsContext";
import { ToolBarContext } from "../../../context/ToolBarContext";
import styles from "./styles.module.css";

interface IPropsToolBarItem {
  color: string;
}
export const Color = ({ color }: IPropsToolBarItem) => {
  const { changeColor } = React.useContext(ColorsContext);
  const { changeTool } = React.useContext(ToolBarContext);
  return (
    <div
      className={`${styles.item}`}
      style={{ background: color }}
      onClick={() => {
        changeColor(color);
        changeTool("draw");
      }}
    ></div>
  );
};
