import React, { ReactNode } from "react";
import { CanvasContext } from "./CanvasContext";
import { ColorsContext } from "./ColorsContext";

interface IToolBarProviderProps {
  children: React.ReactNode;
}
interface IToolsConfig {
  toolType: string;
  e: React.MouseEvent;
  coordinates?: { x: number; y: number };
}
interface IToolBarContext {
  toolSeleted: string;
  changeTool: (type: string) => void;
  useTool: (config: IToolsConfig) => void;
}

export const ToolBarContext = React.createContext({} as IToolBarContext);

export const ToolBarProvider = ({ children }: IToolBarProviderProps) => {
  const [toolSeleted, setToolSeleted] = React.useState("draw" as string);
  const [toolCliked, setToolCliked] = React.useState("" as string);

  const { erase, paint } = React.useContext(ColorsContext);
  const { toogleMenuToolbar, resetCells, saveCells, changeGrid, redo, undo } =
    React.useContext(CanvasContext);

  const tools = {
    toolsSelectable: {
      draw: {
        name: "draw",
        init: (e: React.MouseEvent, coordinates: { x: number; y: number }) =>
          paint(e, coordinates),
      },
      erase: {
        name: "erase",
        init: (e: React.MouseEvent, coordinates: { x: number; y: number }) =>
          erase(e, coordinates),
      },
    },
    toolsClickable: {
      menu: {
        name: "menu",
        init: () => toogleMenuToolbar("main"),
      },
      sizePixel: {
        name: "sizePixel",
        init: () => toogleMenuToolbar("sizePixel"),
      },
      grid: {
        name: "grid",
        init: () => changeGrid(),
      },
      gridSize: {
        name: "gridSize",
        init: () => toogleMenuToolbar("gridSize"),
      },
      save: {
        name: "save",
        init: () => saveCells(),
      },
      clean: {
        name: "clean",
        init: () =>
          confirm("Isso irá limpar a tela, tem certeza?") && resetCells(),
      },
      undo: {
        name: "undo",
        init: () => undo(),
      },
      redo: {
        name: "redo",
        init: () => redo(),
      },
    },
  };

  function changeTool(type: "draw" | "erase" | "size" | "save" | "clean") {
    if (tools.toolsClickable[type]) {
      setToolCliked(tools.toolsClickable[type].name);
    }
    if (tools.toolsSelectable[type]) {
      setToolSeleted(tools.toolsSelectable[type].name);
    }
    return;
  }

  function useTool(config: IToolsConfig) {
    if (tools.toolsClickable[config.toolType]) {
      tools.toolsClickable[config.toolType].init();
    } else {
      tools.toolsSelectable[toolSeleted].init(config.e, config.coordinates);
    }
  }
  return (
    <ToolBarContext.Provider
      value={{
        toolSeleted,
        changeTool,
        useTool,
      }}
    >
      {children}
    </ToolBarContext.Provider>
  );
};
