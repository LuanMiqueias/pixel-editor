import React from "react";
import { CellsContext } from "../../context/CellsContext";
import styles from "./styles.module.css";

export const WarningScreen = () => {
  const { message } = React.useContext(CellsContext);

  return (
    message && (
      <div className={styles.WarningScreen}>
        <p>{message}</p>
      </div>
    )
  );
};
