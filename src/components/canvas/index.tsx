import React from "react";
import { CanvasContext } from "../../context/CanvasContext";
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
  const grid: React.RefObject<HTMLCanvasElement> = React.createRef();

  React.useEffect(() => {
    initCanvas(canvas, grid);
  }, [size]);

  function handleMouse(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const coordinates = { x: e.clientX, y: e.clientY };
    useTool({ e, coordinates, toolType: "" });
  }
  return (
    <div className={styles.container}>
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
      <canvas
        className={`${styles.canvas_grid}`}
        onMouseUp={() => setMouseOver(false)}
        onMouseDown={() => setMouseOver(true)}
        onMouseMove={(e) => handleMouse(e)}
        onClick={(e) => handleMouse(e)}
        ref={grid}
        height="512px"
        width="512px"
      />
    </div>
  );
};
