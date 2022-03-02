import 'bulma/css/bulma.min.css';
import '../public/style.css';
import Layout from "../components/Layout";
import Head from "next/head";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>| foocaptcha |</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <link rel="shortcut icon" href="/favicon-32x32.png" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
