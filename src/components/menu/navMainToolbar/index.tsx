import Link from "next/link";
import React from "react";
import { CanvasContext } from "../../../context/CanvasContext";
import { UserContext } from "../../../context/UserContext";

import styles from "./styles.module.css";

export const NavMainToolbar = () => {
  const { user, changeArt } = React.useContext(UserContext);
  console.log(user)
  return (
    <>
      {user?.arts?.map((item, index) => (
        <Link href={`/editor/${item._id}`} key={item._id}>
          <a
            onClick={() => changeArt(item._id)}
            className={`${styles.item_menu} animation_show_top`}
            style={{
              animationDelay: `${index / 40}s`,
            }}
          >
            {item.title}
          </a>
        </Link>
      ))}
    </>
  );
};
