import Link from "next/link";
import React from "react";
import { CanvasContext } from "../../../context/CanvasContext";

import styles from "./styles.module.css";

export const NavGridSize = () => {
  const { size, changeGridSize } = React.useContext(CanvasContext);
  const menuItems = [
    { name: "8", size: 8 },
    { name: "16", size: 16 },
    { name: "32", size: 32 },
    { name: "64", size: 64 },
    { name: "128", size: 128 },
  ];
  return (
    <div className={styles.content}>
      {menuItems.map((item, index) => (
        <div
          key={item.name}
          className={`${styles.item_menu} animation_show_top`}
          onClick={() => changeGridSize(item.size)}
          style={{
            background: size === item.size && `var(--secundary-color)`,
            color: size === item.size && `var(--text-light)`,
            animationDelay: `${index / 40}s`,
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
