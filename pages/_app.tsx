/* eslint-disable @next/next/no-sync-scripts */
import "../styles/globals.css"

import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "theme-ui";
import { theme } from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>@neelr</title>
        <script src='https://analytics.stacc.cc/api/script/CP5FbkTS998I'></script>
        <meta name="title" content="@neelr" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="find out a little about me!" />

        <meta property="og:url" content="https://neelr.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="@neelr" />
        <meta property="og:description" content="find out a little about me!" />
        <meta property="og:image" content="https://neelr.vercel.app/thumbnail.png" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="neelr.dev" />
        <meta property="twitter:url" content="https://neelr.dev" />
        <meta name="twitter:title" content="@neelr" />
        <meta name="twitter:description" content="find out a little about me!" />
        <meta name="twitter:image" content="https://neelr.vercel.app/thumbnail.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
