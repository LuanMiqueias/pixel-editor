import React from "react";
import { NavGridSize } from "../components/menu/NavGridSize";
import { NavMainToolbar } from "../components/menu/navMainToolbar";
import { NavPincel } from "../components/menu/NavPincel";
import { GlobalContext } from "./GlobalContext";
import { MenuContext } from "./MenuContext";
import { UserContext } from "./UserContext";

interface IPropsProjects {
  title: string;
  image: string;
}

interface ICanvasProviderProps {
  children: React.ReactNode;
}

interface ICanvasContext {
  size: number;
  grid: boolean;
  menu: boolean;
  preview: string;
  sizePixel: number;
  canvasIsBlank: boolean;
  changeSizePixel: (value: number) => void;
  changeGridSize: (size: number) => void;
  resetCells: () => void;
  paintCell: (coordinates: { x: number; y: number }, color: string) => void;
  eraseCell: (coordinates: { x: number; y: number }) => void;
  changeGrid: () => void;
  initCanvas: (
    canvas: React.RefObject<HTMLCanvasElement>,
    grid: React.RefObject<HTMLCanvasElement>
  ) => void;
  saveCells: () => void;
  undo: () => void;
  redo: () => void;
  saveState: () => void;
  loadImageInCanvas: (image: HTMLImageElement) => void;
  renderArt: (id: string) => void;
}

export const CanvasContext = React.createContext({} as ICanvasContext);

export const CanvasProvider = ({ children }: ICanvasProviderProps) => {
  const [canvasIsBlank, setCanvasIsBlank] = React.useState(true);
  const [preview, setPreview] = React.useState(null);
  const [size, setSize] = React.useState(16);
  const [sizePixel, setSizePixel] = React.useState(1);
  const [indexUndoRedo, setIndexUndoRedo] = React.useState(0);
  const [menu, setMenu] = React.useState(false);

  const [grid, setGrid] = React.useState(true);
  const [canvasConfig, setCanvasConfig] = React.useState({
    canvas: null as HTMLCanvasElement,
    ctx: null as CanvasRenderingContext2D,
    rect: null,
    sizeCell: 0,
    canvasSize: 0,
  });
  const [canvasGrid, setcanvasGrid] = React.useState({
    canvas: null as HTMLCanvasElement,
    ctx: null as CanvasRenderingContext2D,
    rect: null,
    sizeCell: 0,
    canvasSize: 0,
  });

  const [history, setHistory] = React.useState([""]);

  const { showMessage, loadImage } = React.useContext(GlobalContext);
  const { closeNav } = React.useContext(MenuContext);
  const { arts } = React.useContext(UserContext);

  const save = React.useCallback(() => {
    if (!canvasGrid.canvas || !canvasConfig.canvas) return;
    setCanvasIsBlank(checkCanvasState());
    setPreview(canvasConfig.canvas.toDataURL());
  }, [paintCell, changeGridSize, eraseCell]);

  React.useEffect(() => {
    if (!canvasConfig.canvas) return;
  }, [paintCell, changeGridSize, canvasConfig]);

  React.useEffect(() => {
    if (!canvasGrid.canvas || !canvasConfig.canvas) return;
    initGrid();
    canvasConfig.ctx.imageSmoothingEnabled = false;
  }, [canvasConfig]);

  React.useEffect(() => {
    const newSize = {
      ...canvasConfig,
      sizeCell: Math.floor(canvasConfig.canvasSize / size),
    };
    canvasConfig.canvas && setCanvasConfig(newSize);
  }, [size]);

  function initCanvas(
    canvasRef: React.RefObject<HTMLCanvasElement>,
    grid: React.RefObject<HTMLCanvasElement>
  ) {
    setCanvasConfig({
      ctx: canvasRef.current.getContext("2d"),
      canvas: canvasRef.current, //ref canvas
      rect: canvasRef.current.getBoundingClientRect(),
      canvasSize: canvasRef.current.width,
      sizeCell: Math.floor(canvasRef.current.width / size),
    });
    setcanvasGrid({
      ctx: grid.current.getContext("2d"),
      canvas: grid.current, //ref canvas
      rect: grid.current.getBoundingClientRect(),
      canvasSize: grid.current.width,
      sizeCell: Math.floor(grid.current.width / size),
    });
  }
  function checkCanvasState() {
    return !canvasConfig.canvas
      .getContext("2d")
      .getImageData(0, 0, canvasConfig.canvas.width, canvasConfig.canvas.height)
      .data.some(function (channel) {
        return channel !== 0;
      });
  }

  function saveState() {
    setHistory([...history, canvasConfig.canvas.toDataURL()]);
  }

  function changeGridSize(size) {
    setSize(size);

    closeNav();
  }

  function changeSizePixel(value) {
    setSizePixel(value);
    closeNav();
  }
  function paintCell(coordinates: { x: number; y: number }, color: string) {
    if (!canvasConfig.canvas) {
      showMessage("error");
      return;
    }

    getCordinatesPixel(coordinates);
    const { x, y } = getCordinatesPixel(coordinates);

    canvasConfig.ctx.fillStyle = color;
    canvasConfig.ctx.fillRect(
      x,
      y,
      canvasConfig.sizeCell * sizePixel,
      canvasConfig.sizeCell * sizePixel
    );
    setIndexUndoRedo(1);
    save();
  }

  function eraseCell(coordinates: { x: number; y: number }) {
    if (!canvasConfig.canvas) {
      showMessage("error");
      return;
    }

    const { x, y } = getCordinatesPixel(coordinates);
    canvasConfig.ctx.clearRect(
      x,
      y,
      canvasConfig.sizeCell * sizePixel,
      canvasConfig.sizeCell * sizePixel
    );
    setIndexUndoRedo(1);
    save();
  }

  function getCordinatesPixel(coordinates: { x: number; y: number }) {
    if (!canvasConfig.canvas) {
      showMessage("error");
      return;
    }

    let x = coordinates.x - canvasConfig.rect.left;
    let y = coordinates.y - canvasConfig.rect.top;

    x = Math.floor(
      Math.floor(x * (size / canvasConfig.canvasSize)) * canvasConfig.sizeCell
    );
    y = Math.floor(
      Math.floor(y * (size / canvasConfig.canvasSize)) * canvasConfig.sizeCell
    );
    return { x, y };
  }
  function resetCells() {
    if (!canvasConfig.canvas) {
      showMessage("error");
      return;
    }

    canvasConfig.ctx.clearRect(
      0,
      0,
      canvasConfig.canvasSize,
      canvasConfig.canvasSize
    );
    setIndexUndoRedo(1);
    save();
  }
  function saveCells() {
    saveState();
    showMessage("save");
  }

  function changeGrid() {
    grid ? clearGrid() : drawGrid();
    setGrid(!grid);
  }

  function undo() {
    // if (!history[history.length - 1 - indexUndoRedo]) return;
    // setIndexUndoRedo(indexUndoRedo + 1);
    // const image = new Image();
    // image.src = history[history.length - 1 - indexUndoRedo];
    // loadImage(image);
  }
  function redo() {
    // if (!history[history.length - 1 - indexUndoRedo]) return;
    // setIndexUndoRedo(indexUndoRedo - 1);
    // const image = new Image();
    // image.src = history[history.length - 1 - indexUndoRedo];
    // loadImage(image);
  }
  // Internal functions
  function initGrid(image?: string) {
    if (!canvasGrid.canvas) {
      showMessage("error");
      return;
    }

    clearGrid();
    clearCanvas();
    drawGrid();
    save();
  }
  function drawGrid() {
    canvasGrid.ctx.strokeStyle = "#404040";

    for (
      let i = canvasGrid.sizeCell;
      i < canvasGrid.canvasSize;
      i += canvasGrid.sizeCell
    ) {
      drawLine(i, 0, i, canvasGrid.canvasSize);
    }
    for (
      let i = canvasGrid.sizeCell;
      i < canvasGrid.canvasSize;
      i += canvasGrid.sizeCell
    ) {
      drawLine(0, i, canvasGrid.canvasSize, i);
    }
  }
  function clearGrid() {
    canvasGrid.ctx.clearRect(
      0,
      0,
      canvasGrid.canvasSize,
      canvasGrid.canvasSize
    );
  }
  function clearCanvas() {
    canvasConfig.ctx.clearRect(
      0,
      0,
      canvasConfig.canvasSize,
      canvasConfig.canvasSize
    );
    save();
  }
  function drawLine(x1: number, y1: number, x2: number, y2: number) {
    if (!canvasGrid.canvas) {
      showMessage("error");
      return;
    }

    canvasGrid.ctx.beginPath();
    canvasGrid.ctx.moveTo(x1, y1);
    canvasGrid.ctx.lineTo(x2, y2);
    canvasGrid.ctx.stroke();
  }

  function loadImageInCanvas(image: HTMLImageElement) {
    if (!canvasConfig.canvas) return;
    image.height = canvasConfig.canvas.height;
    image.width = canvasConfig.canvas.width;
    image.onload = () => {
      canvasConfig.ctx.clearRect(
        0,
        0,
        canvasConfig.canvas.height,
        canvasConfig.canvas.width
      );
      canvasConfig.ctx.drawImage(
        image,
        0,
        0,
        canvasConfig.canvas.height,
        canvasConfig.canvas.width
      );
      save();
    };
  }

  function renderArt(id: string) {
    console.log(arts.find((art) => art._id === id));
  }
  return (
    <CanvasContext.Provider
      value={{
        canvasIsBlank,
        sizePixel,
        size,
        grid,
        menu,
        preview,
        undo,
        redo,
        saveState,
        changeGrid,
        changeSizePixel,
        changeGridSize,
        paintCell,
        eraseCell,
        initCanvas,
        resetCells,
        saveCells,
        loadImageInCanvas,
        renderArt,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};
