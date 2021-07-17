import Head from "next/head";
import React from "react";
import { ColorPalette } from "../components/colorPalette";
import { Table } from "../components/canvas";
import { Toolbar } from "../components/toolbar";
import { WarningScreen } from "../components/warning-screen";
import { ColorsProvider } from "../context/ColorsContext";
import { ToolBarProvider } from "../context/ToolBarContext";

import styles from "../styles/Editor.module.css";
import { CanvasContext, CanvasProvider } from "../context/CanvasContext";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pixel Art | Editor</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@500&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <h1 className={`animation_show_top`}>
        <img src="./logo.svg" alt="" /> <span>Não se esqueça de salvar</span>
      </h1>
      <CanvasProvider>
        <ColorsProvider>
          <ToolBarProvider>
            <main className={`${styles.content} animation_show_opacity`}>
              <WarningScreen />
              <ColorPalette />
              <div className={styles.conatiner_table}>
                <Table />
              </div>
              <Toolbar />
            </main>
          </ToolBarProvider>
        </ColorsProvider>
      </CanvasProvider>
    </div>
  );
}
