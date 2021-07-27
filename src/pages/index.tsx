import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
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
          <Link href="/editor">START</Link>
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
