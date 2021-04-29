import React, { ReactNode } from "react";
import { CellsContext } from "./CellsContext";
import { ColorsContext } from "./ColorsContext";

interface IToolBarProviderProps {
  children: React.ReactNode;
}

interface IToolBarContext {
  tool: string;
  gridOn: boolean;
  changeTool: (type: string) => void;
  useTool: (e: React.MouseEvent, id: string, otherTool?: string) => void;
}

export const ToolBarContext = React.createContext({} as IToolBarContext);

export const ToolBarProvider = ({ children }: IToolBarProviderProps) => {
  const [tool, setTool] = React.useState("draw" as string);
  const { erase, paint } = React.useContext(ColorsContext);
  const { changeSize } = React.useContext(CellsContext);
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
        setGridOn(!gridOn);
        break;
      case "size":
        changeSize();
        break;
    }
  }
  return (
    <ToolBarContext.Provider
      value={{
        tool,
        gridOn,
        changeTool,
        useTool,
      }}
    >
      {children}
    </ToolBarContext.Provider>
  );
};
