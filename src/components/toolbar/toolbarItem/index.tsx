import React from "react";
import { ToolBarContext } from "../../../context/ToolBarContext";
import styles from "./styles.module.css";

interface IPropsToolBarItem {
  img?: string;
  type: string;
  toolCustom?: boolean;
  hover?: string;
  text?: string;
}
export const ToolbarItem = ({
  img,
  type,
  hover,
  text,
  toolCustom,
}: IPropsToolBarItem) => {
  const { tool, toolCustomActive, changeTool, useTool } = React.useContext(
    ToolBarContext
  );
  return (
    <>
      {toolCustom ? (
        <div
          className={`${styles.item}`}
          onClick={() => useTool(null, null, type)}
        >
          {!text ? (
            <img src={toolCustomActive[type] ? hover : img} alt={type} />
          ) : (
            <div className={styles.text}>
              <p>{text}</p>
              <p>{type}</p>
            </div>
          )}
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
