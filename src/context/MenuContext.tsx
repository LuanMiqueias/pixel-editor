import React, { ReactNode } from "react";
import { NavGridSize } from "../components/menu/NavGridSize";
import { NavMainToolbar } from "../components/menu/navMainToolbar";
import { NavPincel } from "../components/menu/NavPincel";
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
      gridSize: {
        name: "gridSize",
        content: <NavGridSize />,
      },
    },
  });

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

  function closeNav() {
    setNavsToolbar({
      ...navsToolbar,
      activeCurrent: "",
    });
  }
  return (
    <MenuContext.Provider value={{ navsToolbar, toogleMenuToolbar, closeNav }}>
      {children}
    </MenuContext.Provider>
  );
};
