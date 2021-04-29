import React from "react";
import { CellsContext } from "../../context/CellsContext";
import { ToolBarContext } from "../../context/ToolBarContext";
import styles from "./styles.module.css";

interface IPropsCell {
  color: string;
  id_color: string;
  size: number;
}
export const Cell = ({ color, id_color, size }: IPropsCell) => {
  const { gridOn, useTool } = React.useContext(ToolBarContext);
  // const { animationCells } = React.useContext(CellsContext);

  return (
    <div
      className={`${styles.cell} ${!gridOn && styles.cell_no_border}`}
      onMouseDown={(e) => useTool(e, id_color)}
      onMouseOver={(e) => useTool(e, id_color)}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        background: color !== "initial" ? color : "#505050",
        width: `${size}rem`,
        height: `${size}rem`,
      }}
    ></div>
  );
};
