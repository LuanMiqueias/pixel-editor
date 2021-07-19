import React from "react";
import { CanvasContext } from "../../context/CanvasContext";
import styles from "./styles.module.css";

interface IPropsTable {
  size: number;
}

export const Preview = () => {
  const { preview, loadImage, canvasIsBlank } = React.useContext(CanvasContext);
  const canvas: React.RefObject<HTMLCanvasElement> = React.useRef();
  const [image, setImage] = React.useState(null as HTMLImageElement);

  React.useEffect(() => {
    if (!canvas.current || !preview) return;
    const ctx = canvas.current.getContext("2d");
    const image = new Image();
    image.src = preview;
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = () => {
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
      ctx.drawImage(image, 0, 0, canvas.current.width, canvas.current.height);
    };
  }, [preview]);

  function download() {
    if (canvasIsBlank) return;

    let element = document.createElement("a");
    element.href = preview && preview;
    element.download = "pixelArt.png";
    element.click();
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.container_canvas}>
          <p>Preview</p>
          <canvas
            ref={canvas}
            className={`${styles.canvas}`}
            height="180px"
            width="180px"
          />
        </div>
        <div className={styles.container_input_block}>
          <button
            className={styles.button_download}
            onClick={download}
            disabled={canvasIsBlank}
          >
            download
          </button>
          <label htmlFor="image_file" className={styles.input_file}>
            Upload new image
            <input
              type="file"
              id="image_file"
              accept="image/png, image/jpeg"
              onClick={(e) => (e.currentTarget.value = null)}
              onChange={(e) => {
                if (!e.target.files.length) return;
                const src = URL.createObjectURL(e.target.files[0]);
                const newImage = new Image();
                newImage.src = src;

                loadImage(newImage);
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
