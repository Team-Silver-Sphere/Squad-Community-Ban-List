import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import { useMemo } from 'react';

import { HOST } from 'scbl-lib/config';

let apolloClient;

export function initializeApollo(initialState = null) {
  const _apolloClient =
    apolloClient ??
    new ApolloClient({
      ssrMode: typeof window === 'undefined',
      link: new HttpLink({ uri: `${HOST}/graphql` }),
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              bans: relayStylePagination(['orderBy', 'orderDirection']),
              steamUsers: relayStylePagination(['orderBy', 'orderDirection'])
            }
          }
        }
      }),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
          errorPolicy: 'ignore'
        },
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all'
        },
        mutate: {
          errorPolicy: 'all'
        }
      }
    });

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState) {
  return useMemo(() => initializeApollo(initialState), [initialState]);
}
