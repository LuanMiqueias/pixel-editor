import React from "react";
import { ToolBarContext } from "../../../context/ToolBarContext";
import { Menu } from "../../menu";
import styles from "./styles.module.css";

interface IPropsToolBarItem {
  type: string;
  img?: string;
  text?: string;
  hover?: string;
  hasMenu?: boolean;
  maxWidth?: string;
  disabled?: boolean;
  isActive?: boolean;
  isClickable?: boolean;
}
export const ToolbarItem = ({
  img,
  type,
  text,
  hover,
  isActive,
  maxWidth,
  disabled,
  hasMenu = false,
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
      } animation_show_top ${hasMenu && styles.hasMenu}`}
      onClick={() => handleClick()}
    >
      <div
        className={`${styles.content_item} ${disabled && styles.item_disabled}`}
      >
        {img ? (
          type === toolSeleted || isActive ? (
            <img
              src={hover ? hover : img}
              alt={type}
              style={maxWidth && { maxWidth: maxWidth }}
            />
          ) : (
            <img
              src={img}
              alt={type}
              style={maxWidth && { maxWidth: maxWidth }}
            />
          )
        ) : (
          <>
            {hover && isActive ? (
              <img
                src={hover ? hover : img}
                alt={type}
                style={maxWidth && { maxWidth: maxWidth }}
              />
            ) : (
              <div className={styles.text}>
                <p>{text}</p>
              </div>
            )}
          </>
        )}
      </div>
      {hasMenu && isActive && <Menu />}
    </div>
  );
};
