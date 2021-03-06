import React from "react";
import { CanvasContext } from "../../context/CanvasContext";
import { GlobalContext } from "../../context/GlobalContext";
import styles from "./styles.module.css";

export const WarningScreen = () => {
  const { message } = React.useContext(GlobalContext);

  return (
    message.message && (
      <div className={styles.WarningScreen}>
        <p>{message.message}</p>
        <span
          className={styles.counter}
          style={{ background: `var(--message-${message.type})` }}
        ></span>
      </div>
    )
  );
};
