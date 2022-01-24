import React from "react";
import styles from "./styles.module.css";
import { Color } from "./colors-item";
import { icons } from '../../icons'
// import ColorPicker from "react-pick-color";
import { HexColorPicker, RgbaColorPicker, RgbaColor } from 'react-colorful';
import { ColorsContext } from "../../context/ColorsContext";
import { UserContext } from "../../context/UserContext";
import { Art } from "../../services/Arts";
import { GlobalContext } from "../../context/GlobalContext";
export const ColorPalette = () => {
  const [loadingColors, setLoadingColors] = React.useState(true)
  const { showMessage } = React.useContext(GlobalContext);
  const { currentArt } = React.useContext(UserContext);
  const { updateArt } = Art();
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
    setLoadingColors(true);
    if (!selectedIDArt || !user) return;
    setColors(user?.arts?.find((art) => art._id == selectedIDArt).colors);
    setLoadingColors(false);
  }, [selectedIDArt, user]);

  React.useEffect(() => {
    if (colors === currentArt?.colors || !selectedIDArt || !colors || loadingColors) return;
    try {
      updateArt({ colors: [...colors] }, selectedIDArt);
    } catch (err) {
      showMessage('error', err)
    }
  }, [colors])
  return (
    <div className={`${styles.palette} animation_show_opacity`}>
      <div className={styles.container_background_color}>
        <button
          className={`${styles.background_color} animation_show_top`}
          style={{ background: color, fill: color }}
          onClick={deleteCurrentColor}
        >
          {colors.find((item) => item === color) && (
            <span className={styles.icon_delete_color}>
              {icons.delete_color}
            </span>
          )}
        </button>
      </div>
      <div className={styles.colorPiker}>
        <HexColorPicker className={styles.colorPikerContainer} color={color} onChange={(color) => {
          changeColor(color);
        }} />
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
            delay={colors.length / 5}
          />
        </div>
      </div>

    </div>
  );
};
