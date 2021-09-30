import React from "react";
import { HeaderEditor } from "../../components/headers/headerEditor";
import { Toolbar } from "../../components/toolbar";
import { CanvasProvider } from "../../context/CanvasContext";
import { ColorsProvider } from "../../context/ColorsContext";
import { GlobalContextProvider } from "../../context/GlobalContext";
import { MenuProvider } from "../../context/MenuContext";
import { ToolBarProvider } from "../../context/ToolBarContext";
import styles from './styles.module.css';

export const EditorLayout: React.FC = ({ children }) => {
  return (
    <>
      <GlobalContextProvider>
        <MenuProvider>
          <CanvasProvider>
            <ColorsProvider>
              <ToolBarProvider>
                <HeaderEditor />
                {children}
              </ToolBarProvider>
            </ColorsProvider>
          </CanvasProvider>
        </MenuProvider>
      </GlobalContextProvider>
    </>
  );
};
