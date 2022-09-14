import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { Provider } from 'urql';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { CartContext } from '../context/CartContext';
import { client, ssrCache } from '../lib/urql';
import '../styles/global.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }

  return (
    <Provider value={client}>
      <SessionProvider session={session}>
        <NextNProgress
          color="#000"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <CartContext>
          <Header />
          <main className="font-Mulish w-full h-scren">
            <Component {...pageProps} />
          </main>
          <Footer />
        </CartContext>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
