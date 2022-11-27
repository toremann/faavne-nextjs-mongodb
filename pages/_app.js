import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import 'bootstrap-icons/font/bootstrap-icons.css'

import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
