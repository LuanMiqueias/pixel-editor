import React, { ReactNode } from "react";
import { CellsContext } from "./CellsContext";
import { ColorsContext } from "./ColorsContext";

interface IToolBarProviderProps {
  children: React.ReactNode;
}

interface IToolBarContext {
  tool: string;
  gridOn: boolean;
  toolCustomActive: string[];
  changeTool: (type: string) => void;
  useTool: (e: React.MouseEvent, id: string, otherTool?: string) => void;
}

export const ToolBarContext = React.createContext({} as IToolBarContext);

export const ToolBarProvider = ({ children }: IToolBarProviderProps) => {
  const [tool, setTool] = React.useState("draw" as string);
  const { erase, paint } = React.useContext(ColorsContext);
  const { changeSize, resetCells, saveCells } = React.useContext(CellsContext);
  const [toolCustomActive, setToolCustomActive] = React.useState(
    {} as string[]
  );
  const [gridOn, setGridOn] = React.useState(true);

  const tools = {
    draw: "draw",
    erase: "erase",
    grid: "grid",
  };

  function changeTool(type: string) {
    setTool(tools[type]);
  }
  function useTool(e: React.MouseEvent, id: string, otherTool?: string) {
    switch (otherTool || tool) {
      case "draw":
        paint(e, id);
        break;
      case "erase":
        erase(e, id);
        break;
      case "grid":
        handleGrid(otherTool);
        break;
      case "size":
        changeSize();
        break;
      case "save":
        saveCells("test");
        break;
      case "clean":
        confirm("Isso irá limpar a tela, tem certeza?") && resetCells();
        break;
    }
  }
  function handleGrid(otherTool) {
    setToolCustomActive(
      gridOn
        ? { ...toolCustomActive, [otherTool]: otherTool }
        : { ...toolCustomActive, [otherTool]: "" }
    );
    setGridOn(!gridOn);
  }
  return (
    <ToolBarContext.Provider
      value={{
        tool,
        gridOn,
        toolCustomActive,
        changeTool,
        useTool,
      }}
    >
      {children}
    </ToolBarContext.Provider>
  );
};
