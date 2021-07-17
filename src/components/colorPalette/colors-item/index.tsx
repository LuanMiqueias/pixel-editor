import React from "react";
import { ColorsContext } from "../../../context/ColorsContext";
import { ToolBarContext } from "../../../context/ToolBarContext";
import styles from "./styles.module.css";

interface IPropsToolBarItem {
  color: string;
}
export const Color = ({ color }: IPropsToolBarItem) => {
  const {
    changeColor,
    color: colorSelect,
    handlePickedColor,
  } = React.useContext(ColorsContext);
  const { changeTool } = React.useContext(ToolBarContext);
  return (
    <>
      {color === "pick-color" ? (
        <label
          className={`${styles.pick_color} animation_show_top`}
          style={{ background: colorSelect }}
          htmlFor="pick-color"
          onClick={() => changeTool("draw")}
        >
          <input
            type="color"
            name="pick-color"
            id="pick-color"
            onChange={(e) => handlePickedColor(e)}
          />
        </label>
      ) : (
        <div
          className={`${styles.item} animation_show_top`}
          style={{ background: color }}
          onClick={() => {
            changeColor(color);
            changeTool("draw");
          }}
        ></div>
      )}
    </>
  );
};
