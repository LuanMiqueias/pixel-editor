import Link from "next/link";
import React from "react";
import { CanvasContext } from "../../context/CanvasContext";
import { ColorsContext } from "../../context/ColorsContext";
import { ToolBarContext } from "../../context/ToolBarContext";
import styles from "./styles.module.css";

export const Menu = () => {
  const { menu } = React.useContext(CanvasContext);
  const menuItems = [
    { name: "meus projetos", link: "/projects", type: "default" },
    { name: "configurações", link: "/config", type: "default" },
    { name: "Excluir projeto", link: "/delete", type: "danger" },
  ];
  return menu ? (
    <nav className={`${styles.container}`}>
      {menuItems.map((item, index) => (
        <Link href={item.link}>
          <a
            className={`${styles.item_menu} animation_show_top`}
            style={{
              background: `var(--menu-item-${item.type})`,
              color: `var(--menu-item-text-${item.type})`,
              animationDelay: `${index / 10}s`,
            }}
          >
            {item.name}
          </a>
        </Link>
      ))}
    </nav>
  ) : (
    <></>
  );
};
