import 'nprogress/nprogress.css';
import Router from 'next/router';
import nProgress from 'nprogress';
import React from 'react';

import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import NextHeader from '@/NextHeader';
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface Props extends AppProps {
  Component: NextPageWithLayout;
}

function App(props: Props) {
  const { Component, pageProps } = props;

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  return (
    <>
      <NextHeader />
      <Component {...pageProps} />
    </>
  );
}

export default App;
