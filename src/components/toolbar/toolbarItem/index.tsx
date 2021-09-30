import React from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { ToolBarContext } from "../../../context/ToolBarContext";
import { UserContext } from "../../../context/UserContext";
import { Menu } from "../../menu";
import styles from "./styles.module.css";

interface IPropsToolBarItem {
  type: string;
  img?: JSX.Element;
  text?: string;
  hover?: JSX.Element;
  hasMenu?: boolean;
  maxWidth?: string;
  disabled?: boolean;
  isActive?: boolean;
  isClickable?: boolean;
  isPrivate?: boolean;
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
  isPrivate,
}: IPropsToolBarItem) => {
  const { toolSeleted, changeTool, useTool } = React.useContext(ToolBarContext);
  const { auth } = React.useContext(UserContext);
  const { showMessage } = React.useContext(GlobalContext);

  function handleClick() {
    if (isPrivate && !auth) {
      showMessage("error", "Crie uma conta para liberar está funcão!");
      return;
    }
    if (isClickable) {
      useTool({ e: null, coordinates: null, toolType: type });
      return;
    }
    changeTool(type);
  }
  return (
    <div
      className={`
        ${styles.item} 
        ${disabled && styles.item_disabled} 
        ${isPrivate && !auth && styles.item_disabled} 
        ${type === toolSeleted && styles.item_active}  
        ${hasMenu && styles.hasMenu} 
      `}
      onClick={() => handleClick()}
    >
      <div className={`${styles.content_item} `}>
        {isActive ? hover : img}
      </div>
      {/* {hasMenu && isActive && <Menu />} */}
    </div>
  );
};
