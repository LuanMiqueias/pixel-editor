import React, { ReactNode } from "react";
import { useTools } from "../hooks/Tools";
import { CanvasContext } from "./CanvasContext";
import { ColorsContext } from "./ColorsContext";
import { MenuContext } from "./MenuContext";

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
  const { toolSeleted, changeTool, useTool } = useTools();
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
