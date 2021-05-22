import React from "react";
import { CanvasContext } from "../../context/CanvasContext";
import { CellsContext } from "../../context/CellsContext";
import { ColorsContext } from "../../context/ColorsContext";
import { ToolBarContext } from "../../context/ToolBarContext";
import styles from "./styles.module.css";

interface IPropsTable {
  size: number;
}

export const Table = () => {
  const { size, initCanvas, resetCells } = React.useContext(CanvasContext);
  const { setMouseOver, mouseOver, color } = React.useContext(ColorsContext);
  const { useTool } = React.useContext(ToolBarContext);

  const canvas: React.RefObject<HTMLCanvasElement> = React.createRef();

  React.useEffect(() => {
    initCanvas(canvas);
  }, [size]);

  function handleMouse(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const coordinates = { x: e.clientX, y: e.clientY };
    useTool(e, coordinates);
  }
  return (
    <canvas
      className={`${styles.canvas}`}
      onMouseUp={() => setMouseOver(false)}
      onMouseDown={() => setMouseOver(true)}
      onMouseMove={(e) => handleMouse(e)}
      onClick={(e) => handleMouse(e)}
      ref={canvas}
      height="512px"
      width="512px"
    />
  );
};
