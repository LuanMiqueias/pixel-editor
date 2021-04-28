import React from "react";
import { ColorsContext } from "../../context/ColorsContext";
import styles from "./styles.module.css";

export const Toolbar = () => {
  const { paint, erase } = React.useContext(ColorsContext);
  return <div></div>;
};
