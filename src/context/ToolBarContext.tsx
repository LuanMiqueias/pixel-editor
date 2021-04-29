import React, { ReactNode } from "react";
import { ColorsContext } from "./ColorsContext";

interface IToolBarProviderProps {
  children: React.ReactNode;
}

interface IToolBarContext {
  tool: string;
  changeTool: (type: string) => void;
  useTool: (e: React.MouseEvent, id: string) => void;
}

export const ToolBarContext = React.createContext({} as IToolBarContext);

export const ToolBarProvider = ({ children }: IToolBarProviderProps) => {
  const [tool, setTool] = React.useState("draw" as string);
  const { erase, paint } = React.useContext(ColorsContext);
  const tools = {
    draw: "draw",
    erase: "erase",
  };

  function changeTool(type: string) {
    setTool(tools[type]);
  }
  function useTool(e: React.MouseEvent, id: string) {
    switch (tool) {
      case "draw":
        paint(e, id);
        break;
      case "erase":
        erase(e, id);
        break;
    }
  }
  return (
    <ToolBarContext.Provider
      value={{
        tool,
        changeTool,
        useTool,
      }}
    >
      {children}
    </ToolBarContext.Provider>
  );
};
