import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { CleanLayout } from "../layouts/clean";
import { UserContext } from "../context/UserContext";
import { Art } from "../services/Arts";

export default function Home() {
  const { auth, loading } = React.useContext(UserContext);
  const { getAllArts, newArt, deleteArt, updateArt } = Art();


  React.useEffect(() => {
    if (!auth) return;
    // getAllArts();
    const artObj = {
      title: "Cogumelo [editado]",
      size: 32,
      // colors: [
      //   "#041B3E",
      //   "#FFFFFF",
      //   "#490505",
      //   "#572102",
      //   "#064904",
      //   "#000000",
      //   "#EB1212",
      //   "#C45414",
      //   "#166714",
      //   "#11A466",
      //   "#371383",
      //   ""
      // ],
      image: "data:image/png;base64,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",

    }
    // newArt(artObj);
    // deleteArt("61ee1b6a5c64692f98354685")
    // updateArt(artObj, "61ee1b278efc47839c34ba68")
  }, [auth]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pixel Art</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <main>
        <div className={`${styles.title} animation_show_top`}>
          <h1>
            Pixel <span>Editor</span>
          </h1>
          <p>Crie pixel arts incriveis</p>
        </div>
        <div className={`${styles.btn_start} animation_show_bottom`}>
          <Link href={auth ? "/user" : "/editor"}>START</Link>
        </div>
      </main>
      <footer className="animation_show_bottom">
        <p>
          Desenvolvido com <img src="/heart.svg" alt="" /> por
          <a href="https://luanmiqueias.com.br/" target="_blank">
            Luan Miqueias
          </a>
        </p>
      </footer>
    </div>
  );
}

Home.getLayout = (page: React.ReactNode) => <CleanLayout children={page} />