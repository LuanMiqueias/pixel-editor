import React from "react";
import styles from "./styles.module.css";
import { Color } from "./colors-item";
import ColorPicker from "react-pick-color";
import { ColorsContext } from "../../context/ColorsContext";
import { UserContext } from "../../context/UserContext";

export const ColorPalette = () => {
  const [colors, setColors] = React.useState([
    "#041B3E",
    "#FFFFFF",
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
  ]);

  function addColor(color: string) {
    if (colors.find((color_item) => color === color_item)) return;
    setColors([...colors, color]);
  }
  function deleteCurrentColor() {
    const newColors = colors.filter((color_item) => color !== color_item);
    console.log(newColors);
    setColors([...newColors]);
  }
  interface IColorsInput {
    alpha: number;
    hex: string;
    hsl: { h: number; s: number; l: number };
    hsv: { h: number; s: number; v: number };
    rgb: { r: number; g: number; b: number };
  }
  const { color, changeColor } = React.useContext(ColorsContext);
  const [colorsInput, setColorsInput] = React.useState<IColorsInput>();
  const { selectedIDArt, user } = React.useContext(UserContext);
  React.useEffect(() => {
    if (!selectedIDArt || !user) return;
    setColors(user?.arts?.find((art) => art._id == selectedIDArt).colors);
  }, [selectedIDArt, user]);

  return (
    <div className={`${styles.palette} animation_show_opacity`}>
      <div className={styles.colorPiker}>
        <ColorPicker
          color={color}
          className={`${styles.colorPicker_component} animation_show_top`}
          onChange={(color) => {
            changeColor(color.hex);
            setColorsInput(color);
          }}
          hideAlpha
          theme={{
            background: "rgba(0,0,0,0)",
            inputBackground: "rgba(255, 255, 255, 0.1)",
            borderColor: "none",
            borderRadius: "3px",
            color: "white",
            width: "100%",
          }}
        />
        <div className={styles.container_pallet_color}>
          {colors.map((color, index) => (
            <Color
              color={color}
              key={`color_${color}_${index}`}
              delay={index + 10}
            />
          ))}
          <Color
            color="pick-color"
            click={addColor}
            delay={colors.length + 10}
          />
        </div>
      </div>
      <div className={styles.container_background_color}>
        <button
          className={`${styles.background_color} animation_show_top`}
          style={{ background: color }}
          onClick={deleteCurrentColor}
        >
          {colors.find((item) => item === color) && (
            <img src="/delete_light.svg" alt="" />
          )}
        </button>
      </div>
    </div>
  );
};
