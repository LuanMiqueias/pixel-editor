import React from "react";
import { NavGridSize } from "../components/menu/NavGridSize";
import { NavMainToolbar } from "../components/menu/navMainToolbar";
import { NavPincel } from "../components/menu/NavPincel";

export function useNavToolbar() {
  const [navsToolbar, setNavsToolbar] = React.useState({
    default: ['sizePixel'],
    activeCurrent: null,
    navs: {
      sizePixel: {
        name: "sizePixel",
        content: <NavPincel key="sizePixel" />,
      },
      main: {
        name: "main",
        content: <NavMainToolbar key="main" />,
      },
      gridSize: {
        name: "gridSize",
        content: <NavGridSize key="gridSize" />,
      },
    },
  });
  function toogleMenuToolbar(names: string[]) {
    const nameExists = names?.filter(item => navsToolbar.navs[item]);
    if (!nameExists) return;
    console.log(nameExists)
    setNavsToolbar({
      ...navsToolbar,
      activeCurrent: nameExists,
    });

    // if (navsToolbar.activeCurrent.filter(item => navsToolbar.navs[item])) {
    //   setNavsToolbar({
    //     ...navsToolbar,
    //     activeCurrent: [""],
    //   });
    // } else {
    //   setNavsToolbar({
    //     ...navsToolbar,
    //     activeCurrent: [...navsToolbar.activeCurrent, name],
    //   });
    // }
    // })
  }

  return { navsToolbar, toogleMenuToolbar };
}
