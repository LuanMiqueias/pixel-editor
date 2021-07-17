import React from "react";
import { CanvasContext } from "../../context/CanvasContext";
import styles from "./styles.module.css";

interface IPropsTable {
  size: number;
}

export const Preview = () => {
  const { preview } = React.useContext(CanvasContext);
  const canvas: React.RefObject<HTMLCanvasElement> = React.useRef();
  // const [image, setImage] = React.useState(null as HTMLImageElement);

  React.useEffect(() => {
    if (!canvas.current) return;
    const ctx = canvas.current.getContext("2d");
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    const image = new Image();
    image.src = preview;
    setTimeout(() => {
      ctx.drawImage(image, 0, 0, canvas.current.width, canvas.current.height);
    });
  }, [preview]);
  return (
    <canvas
      ref={canvas}
      className={`${styles.canvas}`}
      height="180px"
      width="180px"
    />
  );
};
