import React from "react";

interface ICellsProviderProps {
  children: React.ReactNode;
}

interface ICellsContext {
  cells: [{ color: string; id: string }];
  zoom: number;
  newTable: (size: number) => void;
  paintCell: (id: string, color: string) => void;
  eraseCell: (id: string) => void;
  ChangeZoom: (zoomType: "in" | "out") => void;
}

export const CellsContext = React.createContext({} as ICellsContext);

export const CellsProvider = ({ children }: ICellsProviderProps) => {
  const [cells, setCells] = React.useState([{}] as [
    { color: string; id: string }
  ]);
  const [zoom, setZoom] = React.useState(1.4);

  function newTable(size: number) {
    let arraysCells = [];
    const totalCells = size * size;
    for (let i = 0; i < totalCells; i++) {
      arraysCells.push({
        color: "initial",
        id: `cell_id_${i}`,
      });
    }

    setCells(arraysCells as [{ color: string; id: string }]);
  }

  function paintCell(id, color) {
    const cellArray = cells.map((item) => {
      if (item.id === id) {
        item.color = color;
      }
      return item;
    });
    setCells(cellArray as [{ color: string; id: string }]);
  }

  function eraseCell(id) {
    const cellArray = cells.map((item) => {
      if (item.id === id) {
        item.color = "initial";
      }
      return item;
    });
    setCells(cellArray as [{ color: string; id: string }]);
  }

  function ChangeZoom(zoomType: "in" | "out") {
    if (zoomType === "in" && zoom <= 1.8) {
      setZoom(+(zoom + 0.2).toFixed(1));
    } else if (zoomType === "out" && zoom > 0.6) {
      setZoom(+(zoom * 0.8).toFixed(1));
    }
    console.log(zoom);
  }
  return (
    <CellsContext.Provider
      value={{ cells, newTable, paintCell, eraseCell, ChangeZoom, zoom }}
    >
      {children}
    </CellsContext.Provider>
  );
};
