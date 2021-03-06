import React, { ReactNode } from "react";
import { NavGridSize } from "../components/menu/NavGridSize";
import { NavMainToolbar } from "../components/menu/navMainToolbar";
import { NavPincel } from "../components/menu/NavPincel";
import { useNavToolbar } from "../hooks/NavToolbar";
import { CanvasContext } from "./CanvasContext";

interface IMenuProviderProps {}
interface IMenuContextProps {
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
  toogleMenuToolbar: (name: string) => void;
  closeNav: () => void;
}

export const MenuContext = React.createContext({} as IMenuContextProps);

export const MenuProvider: React.FC<IMenuProviderProps> = ({ children }) => {
  const { navsToolbar, toogleMenuToolbar, closeNav } = useNavToolbar();

  return (
    <MenuContext.Provider value={{ navsToolbar, toogleMenuToolbar, closeNav }}>
      {children}
    </MenuContext.Provider>
  );
};
