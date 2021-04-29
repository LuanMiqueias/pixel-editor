import React from "react";
import { CellsContext } from "../../context/CellsContext";
import { ColorsContext } from "../../context/ColorsContext";
import { Cell } from "../cell";
import styles from "./styles.module.css";

interface IPropsTable {
  size: number;
}
export const Table = () => {
  const {
    cells,
    zoom,
    size,
    animationCells,
    newTable,
    ChangeZoom,
  } = React.useContext(CellsContext);
  const { setMouseOver } = React.useContext(ColorsContext);

  React.useEffect(() => {
    newTable();
  }, [size]);

  return (
    <div
      className={`${styles.table}  ${animationCells && styles.animation_show}`}
      onMouseUp={() => setMouseOver(false)}
      onMouseDown={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      onWheel={(e) => {
        if (e.deltaY < 0) ChangeZoom("in");
        else ChangeZoom("out");
      }}
      style={{
        gridTemplateColumns: `repeat(${size}, auto)`,
        gridTemplateRows: `repeat(${size}, auto)`,
      }}
    >
      {cells &&
        cells.map((cell) => {
          return (
            <Cell
              color={cell.color}
              id_color={cell.id}
              key={"cell_key_" + cell.id}
              size={zoom}
            />
          );
        })}
    </div>
  );
};
