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
        <meta name="title" content="@neelr" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="find out a little about me!" />
        <meta name="og:title" content="@neelr" />
        <meta name="og:description" content="find out a little about me!" />
        <meta name="og:image" content="https://neelr.vercel.app/thumbnail.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
