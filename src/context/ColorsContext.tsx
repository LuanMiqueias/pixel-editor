import React, { ReactNode } from "react";
import { CanvasContext } from "./CanvasContext";

interface IColorsProviderProps {
  children: React.ReactNode;
}

interface IColorsProps {
  color: string;
  mouseOver: boolean;
  changeColor: (color: string) => void;
  erase?: (e: React.MouseEvent, coordinates: { x: number; y: number }) => void;
  paint: (e: React.MouseEvent, coordinates: { x: number; y: number }) => void;
  setMouseOver: React.Dispatch<React.SetStateAction<boolean>>;
  handlePickedColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ColorsContext = React.createContext({} as IColorsProps);

export const ColorsProvider = ({ children }: IColorsProviderProps) => {
  const [color, setColor] = React.useState("#FFFFFF");
  const [mouseOver, setMouseOver] = React.useState(false);
  const { paintCell, eraseCell } = React.useContext(CanvasContext);

  function changeColor(color) {
    setColor(color);
  }

  function paint(e: React.MouseEvent, coordinates: { x: number; y: number }) {
    e.preventDefault();
    if (e.type === "mousemove") {
      return mouseOver && paintCell(coordinates, color);
    } else {
      paintCell(coordinates, color);
    }
  }
  function erase(e: React.MouseEvent, coordinates: { x: number; y: number }) {
    e.preventDefault();
    if (e.type === "mousemove") {
      return mouseOver && eraseCell(coordinates);
    } else {
      eraseCell(coordinates);
    }
  }
  function handlePickedColor(e: React.ChangeEvent<HTMLInputElement>) {
    changeColor(e.currentTarget.value);
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
        handlePickedColor,
      }}
    >
      {children}
    </ColorsContext.Provider>
  );
};
