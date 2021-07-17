import Link from "next/link";
import React from "react";
import { CanvasContext } from "../../../context/CanvasContext";

import styles from "./styles.module.css";

export const NavPincel = () => {
  const { sizePixel, changeSizePixel } = React.useContext(CanvasContext);
  const menuItems = [
    { name: "1px", size: 1 },
    { name: "2px", size: 2 },
    { name: "3px", size: 3 },
    { name: "4px", size: 4 },
    { name: "5px", size: 5 },
  ];
  return (
    <nav className={`${styles.container}`}>
      {menuItems.map((item, index) => (
        <div
          className={`${styles.item_menu} animation_show_top`}
          onClick={() => changeSizePixel(item.size)}
          style={{
            background: sizePixel === item.size && `var(--secundary-color)`,
            color: sizePixel === item.size && `var(--text-light)`,
            animationDelay: `${index / 10}s`,
          }}
        >
          {item.name}
        </div>
      ))}
    </nav>
  );
};
