import React from "react";
import { ToolBarContext } from "../../../context/ToolBarContext";
import styles from "./styles.module.css";

interface IPropsToolBarItem {
  type: string;
  img?: string;
  text?: string;
  hover?: string;
  disabled?: boolean;
  isClickable?: boolean;
  isActive?: boolean;
}
export const ToolbarItem = ({
  img,
  type,
  text,
  hover,
  isActive,
  disabled,
  isClickable = false,
}: IPropsToolBarItem) => {
  const { toolSeleted, changeTool, useTool } = React.useContext(ToolBarContext);
  function handleClick() {
    if (isClickable) {
      useTool({ e: null, coordinates: null, toolType: type });
      return;
    }
    changeTool(type);
  }
  return (
    <div
      className={`${styles.item} ${
        type === toolSeleted && styles.item_active
      } animation_show_top`}
      onClick={() => handleClick()}
    >
      {img ? (
        type === toolSeleted || isActive ? (
          <img src={img} alt={type} />
        ) : (
          <img src={hover ? hover : img} alt={type} />
        )
      ) : (
        <div className={styles.text}>
          <p>{text}</p>
          <p>{type}</p>
        </div>
      )}
    </div>
  );
};
