import Head from "next/head";
import { Table } from "../components/table";
import { CellsProvider } from "../context/CellsContext";
import { ColorsProvider } from "../context/ColorsContext";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pixel Art</title>
      </Head>
      <CellsProvider>
        <ColorsProvider>
          <main className={styles.content}>
            <Table size={16} />
          </main>
        </ColorsProvider>
      </CellsProvider>
    </div>
  );
}
