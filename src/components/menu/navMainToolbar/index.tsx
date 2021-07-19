import Link from "next/link";
import React from "react";
import { CanvasContext } from "../../../context/CanvasContext";

import styles from "./styles.module.css";

export const NavMainToolbar = () => {
  const { menu } = React.useContext(CanvasContext);
  const menuItems = [
    { name: "meus projetos", link: "/projects", type: "default" },
    { name: "configurações", link: "/config", type: "default" },
    { name: "Excluir projeto", link: "/delete", type: "danger" },
  ];
  return (
    <>
      {menuItems.map((item, index) => (
        <Link href={item.link} key={item.name}>
          <a
            className={`${styles.item_menu} animation_show_top`}
            style={{
              background: `var(--menu-item-${item.type})`,
              animationDelay: `${index / 40}s`,
            }}
          >
            {item.name}
          </a>
        </Link>
      ))}
    </>
  );
};
