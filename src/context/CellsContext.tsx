import React from "react";

interface ICellsProviderProps {
  children: React.ReactNode;
}

interface ICellsContext {
  cells: [{ color: string; id: string }];
  zoom: number;
  size: number;
  changeSize: (size: number) => void;
  newTable: () => void;
  paintCell: (id: string, color: string) => void;
  eraseCell: (id: string) => void;
  ChangeZoom: (zoomType: "in" | "out") => void;
}

export const CellsContext = React.createContext({} as ICellsContext);

export const CellsProvider = ({ children }: ICellsProviderProps) => {
  const [cells, setCells] = React.useState([{}] as [
    { color: string; id: string }
  ]);
  const [size, setSize] = React.useState(16);
  const [zoom, setZoom] = React.useState(24 / size);

  function changeSize(size) {
    setSize(size);
  }
  function newTable() {
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
    if (zoomType === "in" && zoom <= 24 / size + 6 / size) {
      //Tamanho incial + até onde pode aumentar

      setZoom(+(zoom + 4 / size).toFixed(1));
      //Ajusta a velocidade para o tamanho do zoom
    } else if (zoomType === "out" && zoom > 8 / size) {
      setZoom(+(zoom - 4 / size).toFixed(1));
    }
    console.log(zoom);
  }
  return (
    <CellsContext.Provider
      value={{
        cells,
        zoom,
        size,
        changeSize,
        newTable,
        paintCell,
        eraseCell,
        ChangeZoom,
      }}
    >
      {children}
    </CellsContext.Provider>
  );
};
