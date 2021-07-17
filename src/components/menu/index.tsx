import React from "react";
import { CanvasContext } from "../../context/CanvasContext";

export const Menu: React.FC = () => {
  const { navsToolbar } = React.useContext(CanvasContext);

  return (
    <>
      {navsToolbar.navs[navsToolbar.activeCurrent] &&
        navsToolbar.navs[navsToolbar.activeCurrent].content}
    </>
  );
};
