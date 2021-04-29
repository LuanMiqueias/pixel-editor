import React from "react";
import styles from "./styles.module.css";
import { Color } from "./colors-item";

export const ColorPalette = () => {
  const colors = [
    "#FFFFFF",
    "#041B3E",
    "#490505",
    "#572102",
    "#064904",
    "#000000",
    "#EB1212",
    "#C45414",
    "#6D8E10",
    "#166714",
    "#11A466",
    "#371383",
  ];
  return (
    <div className={`${styles.palette}`}>
      {colors.map((color) => (
        <Color color={color} />
      ))}
    </div>
  );
};
