import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </Head>
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
