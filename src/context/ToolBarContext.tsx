import React, { ReactNode } from "react";
import { CanvasContext } from "./CanvasContext";
import { CellsContext } from "./CellsContext";
import { ColorsContext } from "./ColorsContext";

interface IToolBarProviderProps {
  children: React.ReactNode;
}

interface IToolBarContext {
  tool: string;
  toolCustomActive: string[];
  changeTool: (type: string) => void;
  useTool: (
    e: React.MouseEvent,
    coordinates?: { x: number; y: number },
    otherTool?: string
  ) => void;
}

export const ToolBarContext = React.createContext({} as IToolBarContext);

export const ToolBarProvider = ({ children }: IToolBarProviderProps) => {
  const [tool, setTool] = React.useState("draw" as string);
  const { erase, paint } = React.useContext(ColorsContext);
  const { changeSize, resetCells, saveCells } = React.useContext(CanvasContext);
  const [toolCustomActive, setToolCustomActive] = React.useState(
    {} as string[]
  );

  const tools = {
    draw: "draw",
    erase: "erase",
    grid: "grid",
  };

  function changeTool(type: string) {
    setTool(tools[type]);
  }
  function useTool(
    e: React.MouseEvent,
    coordinates: { x: number; y: number },
    otherTool?: string
  ) {
    switch (otherTool || tool) {
      case "draw":
        paint(e, coordinates);
        break;
      case "erase":
        erase(e, coordinates);
        break;
      case "size":
        changeSize();
        break;
      case "clean":
        confirm("Isso irá limpar a tela, tem certeza?") && resetCells();
        break;
      case "save":
        saveCells();
        break;
    }
  }
  return (
    <ToolBarContext.Provider
      value={{
        tool,
        toolCustomActive,
        changeTool,
        useTool,
      }}
    >
      {children}
    </ToolBarContext.Provider>
  );
};
