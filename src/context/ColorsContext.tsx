import React, { ReactNode } from "react";
import { CellsContext } from "./CellsContext";

interface IColorsProviderProps {
  children: React.ReactNode;
}

interface IColorsProps {
  color: string;
  mouseOver: boolean;
  changeColor: (color: string) => void;
  erase?: (e: React.MouseEvent, id: string) => void;
  paint: (e: React.MouseEvent, id: string) => void;
  setMouseOver: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ColorsContext = React.createContext({} as IColorsProps);

export const ColorsProvider = ({ children }: IColorsProviderProps) => {
  const [color, setColor] = React.useState("#FFFFFF");
  const [mouseOver, setMouseOver] = React.useState(false);
  const { paintCell, eraseCell } = React.useContext(CellsContext);

  function changeColor(color) {
    setColor(color);
  }

  function paint(e: React.MouseEvent, id: string) {
    e.preventDefault();
    if (e.type === "mouseover") {
      return mouseOver && paintCell(id, color);
    } else {
      paintCell(id, color);
    }
  }
  function erase(e: React.MouseEvent, id: string) {
    e.preventDefault();
    if (e.type === "mouseover") {
      return mouseOver && eraseCell(id);
    } else {
      eraseCell(id);
    }
  }

  return (
    <ColorsContext.Provider
      value={{
        color,
        mouseOver,
        changeColor,
        paint,
        setMouseOver,
        erase,
      }}
    >
      {children}
    </ColorsContext.Provider>
  );
};
