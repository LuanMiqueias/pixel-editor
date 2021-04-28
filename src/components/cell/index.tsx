import React from "react";
import { ColorsContext } from "../../context/ColorsContext";
import styles from "./styles.module.css";

interface IPropsCell {
  color: string;
  id_color: string;
}
export const Cell = ({ color, id_color }: IPropsCell) => {
  const { paint, erase } = React.useContext(ColorsContext);
  return (
    <div
      className={styles.cell}
      onMouseDown={(e) => paint(e, id_color)}
      onMouseOver={(e) => paint(e, id_color)}
      onContextMenu={(e) => e.preventDefault()}
      style={
        color !== "initial" ? { background: color } : { background: "#505050" }
      }
    ></div>
  );
};
