import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'urql';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { CartContext } from '../context/CartContext';
import { client, ssrCache } from '../lib/urql';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Provider value={client}>
        <CartContext>
          <Header />
          <main className="font-Mulish w-full h-scren">
            <Component {...pageProps} />
          </main>
          <Footer />
        </CartContext>
      </Provider>
    </>
  );
}

export default MyApp;
