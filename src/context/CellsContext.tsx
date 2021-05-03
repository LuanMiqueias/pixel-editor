import React from "react";

interface ICellsProviderProps {
  children: React.ReactNode;
}

interface ICellsContext {
  cells: ICell[];
  zoom: number;
  size: number;
  animationCells: boolean;
  changeSize: () => void;
  newTable: () => void;
  paintCell: (id: string, color: string) => void;
  eraseCell: (id: string) => void;
  ChangeZoom: (zoomType: "in" | "out") => void;
  resetCells: () => void;
  saveCells: (title: string) => void;
  message: string;
}

interface IPropsProjects {
  title: string;
  state: ICell[];
  size: number;
}
interface ICell {
  color: string;
  id: string;
  position: [number, number];
}
export const CellsContext = React.createContext({} as ICellsContext);

export const CellsProvider = ({ children }: ICellsProviderProps) => {
  const [title, setTitle] = React.useState("test");
  const [isEdit, setIsEdit] = React.useState(false);
  const [cells, setCells] = React.useState<ICell[]>();
  const [size, setSize] = React.useState(16);
  const [zoom, setZoom] = React.useState(24 / size);
  const [animationCells, setAnimationCells] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    setZoom(24 / size);
  }, [size]);

  React.useEffect(() => {
    if (localStorage.projects) {
      const projects = JSON.parse(localStorage.projects) as IPropsProjects[];
      projects.find((project) => {
        if (project.title === title) {
          setCells(project.state);
          setTitle(project.title);
          setSize(project.size);
          setIsEdit(true);
          return;
        }
      });
    }
  }, []);

  function idCell(i: number) {
    const newID =
      "" +
      new Date().getMilliseconds() * (i + 3) +
      new Date().getSeconds() +
      new Date().getMinutes() +
      new Date().getHours() +
      new Date().getDay() +
      new Date().getMonth() +
      new Date().getFullYear() * i +
      Math.floor(Math.random() * 100) * (i + 3) +
      "";
    return newID;
  }
  function changeSize() {
    setAnimationCells(true);
    switch (size) {
      case 8:
        setSize(16);
        break;
      case 16:
        setSize(32);
        break;
      case 32:
        setSize(8);
        break;
    }
    setZoom(24 / size);
    newTable();
    setTimeout(() => {
      setAnimationCells(false);
    }, 800);
  }
  function newTable(force?: "force") {
    if (!isEdit || force) {
      let arraysCells: ICell[] = [];
      const totalCells = size * size;
      for (let i = 0; i < totalCells; i++) {
        let positionX = Math.floor(i / size);
        let positionY = Math.floor(i + 1 / size);
        arraysCells.push({
          color: "initial",
          id: `cell_id_${idCell(i)}`,
          position: [positionX, positionY],
        });
      }
      setCells(arraysCells);
    }
  }

  function paintCell(id, color) {
    const cellArray: ICell[] = cells.map((item) => {
      if (item.id === id) {
        item.color = color;
      }
      return item;
    });
    setCells(cellArray);
  }

  function eraseCell(id) {
    const cellArray = cells.map((item) => {
      if (item.id === id) {
        item.color = "initial";
      }
      return item;
    });
    setCells(cellArray);
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
  function resetCells() {
    newTable("force");
  }
  function saveCells(title: string) {
    const newProject: IPropsProjects = { title, state: cells, size };
    if (localStorage.projects) {
      const projects = JSON.parse(localStorage.projects) as IPropsProjects[];
      const projectSearch = projects.find((project, index) => {
        if (project.title === newProject.title) {
          project.state = newProject.state;
          project.size = newProject.size;
          return project;
        }
      });
      if (!projectSearch) {
        projects.push(newProject);
      }
      localStorage.projects = JSON.stringify(projects);
      showMessage("save");
      return;
    }

    localStorage.projects = {};
    localStorage.projects = JSON.stringify([{ ...newProject }]);
  }

  function showMessage(type) {
    switch (type) {
      case "save":
        setMessage("Salvo com sucesso!");
        break;
      default:
        setMessage("Sucesso!");
    }
    setTimeout(() => {
      setMessage("");
    }, 2500);
  }
  return (
    <CellsContext.Provider
      value={{
        message,
        cells,
        zoom,
        size,
        animationCells,
        changeSize,
        newTable,
        paintCell,
        eraseCell,
        ChangeZoom,
        resetCells,
        saveCells,
      }}
    >
      {children}
    </CellsContext.Provider>
  );
};
