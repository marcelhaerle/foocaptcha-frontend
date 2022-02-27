import 'bulma/css/bulma.min.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import '../public/style.css';
import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
