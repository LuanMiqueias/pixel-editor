import React from "react";
import { ToolBarContext } from "../../../context/ToolBarContext";
import styles from "./styles.module.css";

interface IPropsToolBarItem {
  img: string;
  type: string;
  hover?: string;
}
export const ToolbarItem = ({ img, type, hover }: IPropsToolBarItem) => {
  const { tool, gridOn, changeTool, useTool } = React.useContext(
    ToolBarContext
  );
  return (
    <>
      {type === "grid" ? (
        <div
          className={`${styles.item}`}
          onClick={() => useTool(null, null, type)}
        >
          <img src={!gridOn ? hover : img} alt={type} />
        </div>
      ) : (
        <div
          className={`${styles.item} ${type === tool && styles.item_active}`}
          onClick={() => changeTool(type)}
        >
          <img src={img} alt={type} />
        </div>
      )}
    </>
  );
};
