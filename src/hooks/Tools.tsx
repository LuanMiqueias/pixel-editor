import React from "react";
import { CanvasContext } from "../context/CanvasContext";
import { ColorsContext } from "../context/ColorsContext";
import { MenuContext } from "../context/MenuContext";
import { useNavToolbar } from "./NavToolbar";

interface IToolsConfig {
  toolType: string;
  e: React.MouseEvent;
  coordinates?: { x: number; y: number };
}

export function useTools() {
  const [toolSeleted, setToolSeleted] = React.useState("draw" as string);
  const [toolCliked, setToolCliked] = React.useState("" as string);

  const { erase, paint } = React.useContext(ColorsContext);
  const { resetCells, saveCells, changeGrid, redo, undo } =
    React.useContext(CanvasContext);
  const { toogleMenuToolbar } = React.useContext(MenuContext);

  const tools = {
    toolsSelectable: {
      draw: {
        menu: ['sizePixel'],
        name: "draw",
        init: (e: React.MouseEvent, coordinates: { x: number; y: number }) =>
          paint(e, coordinates),
      },
      erase: {
        menu: ['sizePixel', 'main'],
        name: "erase",
        init: (e: React.MouseEvent, coordinates: { x: number; y: number }) =>
          erase(e, coordinates),
      },
    },
    toolsClickable: {
      menu: {
        name: "menu",
        init: () => toogleMenuToolbar(["main"]),
      },
      sizePixel: {
        name: "sizePixel",
        init: () => toogleMenuToolbar(["sizePixel"]),
      },
      grid: {
        menu: ['gridSize'],
        name: "grid",
        init: () => changeGrid(),
      },
      gridSize: {
        name: "gridSize",
        init: () => toogleMenuToolbar(["gridSize"]),
      },
      save: {
        name: "save",
        init: () => saveCells(),
      },
      clean: {
        name: "clean",
        init: () =>
          confirm("Isso irá limpar a tela, tem certeza?") && resetCells(),
      },
      undo: {
        name: "undo",
        init: () => undo(),
      },
      redo: {
        name: "redo",
        init: () => redo(),
      },
    },
  };

  function changeTool(type: "draw" | "erase" | "size" | "save" | "clean") {
    if (tools.toolsClickable[type]) {
      setToolCliked(tools.toolsClickable[type].name);
      toogleMenuToolbar(tools.toolsClickable[type]?.menu)
    }
    if (tools.toolsSelectable[type]) {
      setToolSeleted(tools.toolsSelectable[type].name);
      toogleMenuToolbar(tools.toolsSelectable[type]?.menu)
    }
    return;
  }

  function useTool(config: IToolsConfig) {
    if (tools.toolsClickable[config.toolType]) {
      tools.toolsClickable[config.toolType].init();
    } else {
      toogleMenuToolbar(tools.toolsSelectable[config.toolType]?.menu)
      tools.toolsSelectable[toolSeleted].init(config.e, config.coordinates);
    }
  }

  return { toolSeleted, useTool, changeTool };
}
