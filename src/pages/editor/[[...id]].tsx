import Head from "next/head";
import React from "react";
import { ColorPalette } from "../../components/colorPalette";
import { Table } from "../../components/canvas";
import { Toolbar } from "../../components/toolbar";
import { WarningScreen } from "../../components/warning-screen";
import { ColorsProvider } from "../../context/ColorsContext";
import { ToolBarProvider } from "../../context/ToolBarContext";

import styles from "../../styles/Editor.module.css";
import { CanvasProvider } from "../../context/CanvasContext";
import { Preview } from "../../components/preview";
import {
  GlobalContext,
  GlobalContextProvider,
} from "../../context/GlobalContext";
import { MenuProvider } from "../../context/MenuContext";
import { useRouter } from "next/router";
import { EditorLayout } from "../../layouts/editor";
import { NavGridSize } from "../../components/menu/NavGridSize";
import { UserContext } from "../../context/UserContext";

export default function Editor() {
  const { } = React.useContext(GlobalContext);
  const { changeArt } = React.useContext(UserContext);
  const router = useRouter();
  React.useEffect(() => {
    if (!router.query?.id) return;
    changeArt(router.query?.id[0])
  }, [router.query?.id]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pixel Art | Editor</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@500&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      {/* <h1 className={`animation_show_top`}>
        <img src="./logo.svg" alt="" />{" "}
        <span>um simples editor de pixel arts</span>
      </h1> */}
      <h2 className={styles.moblie_waring}>
        Não há suporte para telas menores que <br /> <span>768px</span>
      </h2>
      <WarningScreen />
      <main className={`${styles.content}`}>
        <div className={styles.container_toolbar}>
          <Toolbar />
        </div>
        <div className={`${styles.container_canvas} animation_show_opacity`}>
          <Table />
        </div>
        <div className={styles.container_canvasConfig}>
          <Preview />
          <NavGridSize />
        </div>
      </main>
      {/* <main className={`${styles.content} animation_show_opacity`}>
                  <div className={styles.column}>
                    <WarningScreen />
                    <ColorPalette />
                  </div>
                  <div className={styles.container_editor}>
                    <div className={styles.container_table}>
                      <Table />
                    </div>
                    <Toolbar />
                  </div>
                  <div className={styles.column}>
                    <Preview />
                  </div>
                </main> */}
    </div>
  );
}

Editor.getLayout = (page: React.ReactNode) => <EditorLayout children={page} />