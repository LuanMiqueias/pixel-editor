import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <img src="/logo.svg" alt="" className="logo" />
      <a
        href="https://github.com/LuanMiqueias/pixel-editor"
        target="_blank"
        className="github_link"
      >
        <img src="/github_logo.svg" alt="github" />
      </a>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
