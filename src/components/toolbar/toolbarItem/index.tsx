import React from "react";
import { ToolBarContext } from "../../../context/ToolBarContext";
import styles from "./styles.module.css";

interface IPropsToolBarItem {
  img: string;
  type: string;
}
export const ToolbarItem = ({ img, type }: IPropsToolBarItem) => {
  const { tool, changeTool } = React.useContext(ToolBarContext);
  return (
    <div
      className={`${styles.item} ${type === tool && styles.item_active}`}
      onClick={() => changeTool(type)}
    >
      <img src={img} alt={type} />
    </div>
  );
};
