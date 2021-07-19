import Link from "next/link";
import React from "react";
import { CanvasContext } from "../../../context/CanvasContext";

import styles from "./styles.module.css";

export const NavPincel = () => {
  const { sizePixel, changeSizePixel } = React.useContext(CanvasContext);
  const menuItems = [
    { name: "1", size: 1 },
    { name: "2", size: 2 },
    { name: "3", size: 3 },
    { name: "4", size: 4 },
    { name: "5", size: 5 },
    { name: "6", size: 6 },
  ];
  return (
    <div className={styles.content}>
      {menuItems.map((item, index) => (
        <div
          key={item.name}
          className={`${styles.item_menu} animation_show_top`}
          onClick={() => changeSizePixel(item.size)}
          style={{
            background: sizePixel === item.size && `var(--secundary-color)`,
            color: sizePixel === item.size && `var(--text-light)`,
            animationDelay: `${index / 40}s`,
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
