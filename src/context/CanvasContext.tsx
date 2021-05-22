import React from "react";

interface IPropsProjects {
  title: string;
  image: string;
}

interface ICanvasProviderProps {
  children: React.ReactNode;
}

interface ICanvasContext {
  size: number;
  message: string;
  changeSize: () => void;
  resetCells: () => void;
  paintCell: (coordinates: { x: number; y: number }, color: string) => void;
  eraseCell: (coordinates: { x: number; y: number }) => void;
  initCanvas: (canvas: React.RefObject<HTMLCanvasElement>) => void;
  saveCells: () => void;
}

export const CanvasContext = React.createContext({} as ICanvasContext);

export const CanvasProvider = ({ children }: ICanvasProviderProps) => {
  let ctx: CanvasRenderingContext2D = null;
  let canvas: HTMLCanvasElement = null;
  let sizeCell = 0;
  let canvasSize = 0;

  const [size, setSize] = React.useState(16);
  const [message, setMessage] = React.useState("");

  function initCanvas(canvasRef: React.RefObject<HTMLCanvasElement>) {
    canvas = canvasRef.current; //ref canvas

    canvasSize = canvas.width;
    sizeCell = Math.floor(canvasSize / size);
    ctx = canvas.getContext("2d");
    makeGrid();
  }

  function changeSize() {
    switch (size) {
      case 8:
        setSize(16);
        break;
      case 16:
        setSize(32);
        break;
      case 32:
        setSize(8);
        break;
    }
  }
  function paintCell(coordinates: { x: number; y: number }, color: string) {
    const { x, y } = getCordinatesPixel(coordinates);

    ctx.fillStyle = color;
    ctx.fillRect(x, y, sizeCell - 2, sizeCell - 2);
    ctx.save();
  }

  function eraseCell(coordinates: { x: number; y: number }) {
    const { x, y } = getCordinatesPixel(coordinates);
    ctx.clearRect(x, y, sizeCell - 2, sizeCell - 2);
  }

  function getCordinatesPixel(coordinates: { x: number; y: number }) {
    let rect = canvas.getBoundingClientRect();

    let x = coordinates.x - rect.left;
    let y = coordinates.y - rect.top;

    x = Math.floor(Math.floor(x * (size / canvasSize)) * sizeCell) + 1;
    y = Math.floor(Math.floor(y * (size / canvasSize)) * sizeCell) + 1;

    return { x, y };
  }
  function resetCells() {
    makeGrid();
  }
  function saveCells() {}
  function showMessage(type: string) {
    switch (type) {
      case "save":
        setMessage("Salvo com sucesso!");
        break;
      default:
        setMessage("Sucesso!");
    }
    setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  // Internal functions
  function makeGrid(image?: string) {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.strokeStyle = "#404040";

    for (let i = sizeCell; i < canvasSize; i += sizeCell) {
      drawLine(i, 0, i, canvasSize);
    }
    for (let i = sizeCell; i < canvasSize; i += sizeCell) {
      drawLine(0, i, canvasSize, i);
    }
  }
  function drawLine(x1: number, y1: number, x2: number, y2: number) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  return (
    <CanvasContext.Provider
      value={{
        message,
        size,
        changeSize,
        paintCell,
        eraseCell,
        initCanvas,
        resetCells,
        saveCells,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};
