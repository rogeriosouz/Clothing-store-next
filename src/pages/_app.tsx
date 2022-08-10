import { AppProps } from 'next/app';
import { Provider } from 'urql';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { client, ssrCache } from '../lib/urql';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }

  return (
    <>
      <Provider value={client}>
        <Header />
        <main className="w-full h-scren">
          <Component {...pageProps} />
        </main>
        <Footer />
      </Provider>
    </>
  );
}

export default MyApp;
