import React from "react";
import { NavGridSize } from "../components/menu/NavGridSize";
import { NavMainToolbar } from "../components/menu/navMainToolbar";
import { NavPincel } from "../components/menu/NavPincel";

export function useNavToolbar() {
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

  return { navsToolbar, toogleMenuToolbar, closeNav };
}
