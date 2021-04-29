import React from "react";
import { ToolBarContext } from "../../context/ToolBarContext";
import styles from "./styles.module.css";

interface IPropsCell {
  color: string;
  id_color: string;
}
export const Cell = ({ color, id_color }: IPropsCell) => {
  const { tool, useTool } = React.useContext(ToolBarContext);
  return (
    <div
      className={`${styles.cell} ${tool === "erase" && styles.erase}`}
      onMouseDown={(e) => useTool(e, id_color)}
      onMouseOver={(e) => useTool(e, id_color)}
      onContextMenu={(e) => e.preventDefault()}
      style={
        color !== "initial" ? { background: color } : { background: "#505050" }
      }
    ></div>
  );
};
