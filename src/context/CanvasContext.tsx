import React from "react";
import { NavMainToolbar } from "../components/menu/navMainToolbar";
import { NavPincel } from "../components/menu/NavPincel";

interface IPropsProjects {
  title: string;
  image: string;
}

interface ICanvasProviderProps {
  children: React.ReactNode;
}

interface ICanvasContext {
  size: number;
  message: { message: string; type: string };
  grid: boolean;
  menu: boolean;
  preview: string;
  navsToolbar: {
    activeCurrent: string;
    navs: {
      sizePixel: {
        name: string;
        content: React.ReactNode;
      };
      main: {
        name: string;
        content: React.ReactNode;
      };
    };
  };
  sizePixel: number;
  toogleMenuToolbar: (name: string) => void;
  changeSizePixel: (value: number) => void;
  changeSize: () => void;
  resetCells: () => void;
  paintCell: (coordinates: { x: number; y: number }, color: string) => void;
  eraseCell: (coordinates: { x: number; y: number }) => void;
  changeGrid: () => void;
  initCanvas: (
    canvas: React.RefObject<HTMLCanvasElement>,
    grid: React.RefObject<HTMLCanvasElement>
  ) => void;
  saveCells: () => void;
}

export const CanvasContext = React.createContext({} as ICanvasContext);

export const CanvasProvider = ({ children }: ICanvasProviderProps) => {
  const [preview, setPreview] = React.useState("");
  const [size, setSize] = React.useState(16);
  const [sizePixel, setSizePixel] = React.useState(1);

  const [navsToolbar, setNavsToolbar] = React.useState({
    activeCurrent: "",
    navs: {
      sizePixel: {
        name: "sizePixel",
        content: <NavPincel />,
      },
      main: {
        name: "main",
        content: <NavMainToolbar />,
      },
    },
  });
  const [menu, setMenu] = React.useState(false);
  const [message, setMessage] = React.useState({
    message: "",
    type: "default",
  });
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

  React.useEffect(() => {
    if (!canvasConfig.canvas) return;
  }, [paintCell, changeSize, canvasConfig]);

  const save = React.useCallback(() => {
    setPreview(canvasConfig.canvas.toDataURL());
  }, [paintCell, changeSize, eraseCell, initCanvas]);

  React.useEffect(() => {
    canvasGrid.canvas && initGrid();
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

  function changeSize() {
    switch (size) {
      case 8:
        setSize(16);
        break;
      case 16:
        setSize(32);
        break;
      case 32:
        setSize(64);
        break;
      case 64:
        setSize(8);
        break;
    }
  }
  function toogleMenuToolbar(name: string) {
    if (!navsToolbar.navs[name]) return;

    if (navsToolbar.activeCurrent === name) {
      setNavsToolbar({
        ...navsToolbar,
        activeCurrent: "",
      });
    } else {
      setNavsToolbar({
        ...navsToolbar,
        activeCurrent: name,
      });
    }
  }
  function changeSizePixel(value) {
    setSizePixel(value);
    setNavsToolbar({
      ...navsToolbar,
      activeCurrent: "",
    });
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
    save();
  }

  function getCordinatesPixel(coordinates: { x: number; y: number }) {
    if (!canvasConfig.canvas) {
      showMessage("error");
      return;
    }

    let x =
      coordinates.x -
      canvasConfig.sizeCell * (sizePixel / 2) -
      canvasConfig.rect.left;
    let y =
      coordinates.y -
      canvasConfig.sizeCell * (sizePixel / 2) -
      canvasConfig.rect.top;

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
    save();
  }
  function saveCells() {
    showMessage("save");
  }
  function showMessage(
    type: "save" | "error" | "waring",
    customMessage?: string
  ) {
    const messages = {
      initial: { message: "", type: "default" },
      save: { message: "Salvo com sucesso!", type: "sucess" },
      error: { message: "Tente novamente mais tarde", type: "error" },
      waring: { message: "Tente novamente mais tarde", type: "waring" },
    };
    if (customMessage) {
      setMessage({
        message: customMessage,
        type: messages[type].type,
      });
    } else {
      setMessage(messages[type]);
    }

    setTimeout(() => {
      setMessage(messages.initial);
    }, 2500);
  }

  function changeGrid() {
    grid ? clearGrid() : drawGrid();
    setGrid(!grid);
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

  return (
    <CanvasContext.Provider
      value={{
        sizePixel,
        navsToolbar,
        message,
        size,
        grid,
        menu,
        preview,
        toogleMenuToolbar,
        changeGrid,
        changeSizePixel,
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
