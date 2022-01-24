import React, { ReactNode } from "react";
import { CanvasContext } from "./CanvasContext";

interface IGlobalProviderProps { }
interface IGlobalContextProps {
  message: { message?: string; type?: string };
  showMessage: (
    type: "login" | "save" | "error" | "waring",
    message?: string
  ) => void;
  loadImage: (
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) => void;

}

export const GlobalContext = React.createContext({} as IGlobalContextProps);

export const GlobalContextProvider: React.FC<IGlobalProviderProps> = ({ children }) => {
  const [message, setMessage] = React.useState({
    message: "",
    type: "default",
  });


  function showMessage(
    type: "login" | "save" | "error" | "waring",
    customMessage?: string
  ) {
    const messages = {
      initial: { message: "", type: "default" },
      login: { message: "Login feito com sucesso!", type: "sucess" },
      save: { message: "Salvo com sucesso!", type: "sucess" },
      error: { message: "Tente novamente mais tarde", type: "error" },
      waring: { message: "Tente novamente mais tarde", type: "waring" },
    };
    setMessage(
      customMessage
        ? { message: customMessage, type: messages[type].type }
        : { ...messages[type] }
    );

    setTimeout(() => {
      setMessage(messages.initial);
    }, 2500);
  }

  function loadImage(
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    if (!canvas) return;
    image.height = canvas.height;
    image.width = canvas.width;
    return (image.onload = () => {
      context.clearRect(0, 0, canvas.height, canvas.width);
      context.drawImage(image, 0, 0, canvas.height, canvas.width);
    });
  }
  return (
    <GlobalContext.Provider
      value={{
        message,
        loadImage,
        showMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
