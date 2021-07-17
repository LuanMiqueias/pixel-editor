import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
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
