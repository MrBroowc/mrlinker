/* eslint-disable no-unused-vars */
import "broowc/styles/globals.css";
import "broowc/styles/appearanceSettings.css";
import "broowc/styles/nprogress.css";
import "antd/dist/reset.css";
import { AuthProvider } from "broowc/context/AuthContext";
import { useEffect } from "react";
import nProgress from "nprogress";
import Router from "next/router";
import { AppContextProvider } from "broowc/context/AppContext";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    let template = `
    <div class="bar" role="bar">
      <div class="peg"></div>
    </div>
    <div class="spinner" role="spinner">
      <div class="spinner-icon"></div>
    </div>
    `;
    nProgress.configure({ showSpinner: true, template: template });
    Router.events.on("routeChangeStart", (url) => {
      // console.log(nProgress);
      nProgress.start();
    });

    Router.events.on("routeChangeComplete", (url) => {
      nProgress.done(false);
    });

    Router.events.on("routeChangeError", (url) => {
      nProgress.start();
    });
  }, []);
  return (
    <AppContextProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </AppContextProvider>
  );
}
