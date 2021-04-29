import Head from "next/head";
import { ColorPalette } from "../components/colorPalette";
import { Table } from "../components/table";
import { Toolbar } from "../components/toolbar";
import { CellsProvider } from "../context/CellsContext";
import { ColorsProvider } from "../context/ColorsContext";
import { ToolBarProvider } from "../context/ToolBarContext";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pixel Art</title>
      </Head>
      <h1>
        {" "}
        <img src="./logo.svg" alt="" />{" "}
      </h1>
      <CellsProvider>
        <ColorsProvider>
          <ToolBarProvider>
            <main className={styles.content}>
              <ColorPalette />
                <div className={styles.conatiner_table}>
                  <Table size={16} />
                </div>
              <Toolbar />
            </main>
          </ToolBarProvider>
        </ColorsProvider>
      </CellsProvider>
    </div>
  );
}
