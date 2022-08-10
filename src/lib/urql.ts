// import { ApolloClient, InMemoryCache } from '@apollo/client';

// const client = new ApolloClient({
//   uri: 'https://api-sa-east-1.hygraph.com/v2/cl5y24kgg28g901ukbwi2900y/master',
//   cache: new InMemoryCache(),
// });

// export default client;

import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from 'urql';

const isServerSide = typeof window === 'undefined';
const ssrCache = ssrExchange({ isClient: !isServerSide });

const client = createClient({
  url: 'https://api-sa-east-1.hygraph.com/v2/cl5y24kgg28g901ukbwi2900y/master',
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
});

export { client, ssrCache };
