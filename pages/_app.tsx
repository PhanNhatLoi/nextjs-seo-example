import "nprogress/nprogress.css";

import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import React from "react";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface Props extends AppProps {
  Component: NextPageWithLayout;
}

function App(props: Props) {
  const { Component, pageProps } = props;

  Router.events.on("routeChangeStart", nProgress.start);
  Router.events.on("routeChangeError", nProgress.done);
  Router.events.on("routeChangeComplete", nProgress.done);

  return (
    <>
      <Head>
        <title>{"title"}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="shortcut icon" href="/logo.png" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default App;
