import Head from "next/head";
import { WarningScreen } from "../components/warning-screen";
import { GlobalContextProvider } from "../context/GlobalContext";
import { UserProvider } from "../context/UserContext";
import { DefaultLayout } from "../layouts/default";
import "../styles/globals.css";
import '../styles/react-colorful.css';

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => children);
  const getLayout = Component.getLayout || ((page) => <DefaultLayout children={page} />)
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600;700&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      {/* <a
        href="https://github.com/LuanMiqueias/pixel-editor"
        target="_blank"
        className="github_link"
      >
        <img src="/github_logo.svg" alt="github" />
      </a> */}
      <GlobalContextProvider>
        <UserProvider>
          <>
            <WarningScreen />
            {getLayout(<Component {...pageProps} />)}
          </>
        </UserProvider>
      </GlobalContextProvider>
    </>
  );
}

export default MyApp;
