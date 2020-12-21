import React, { useState, useEffect } from 'react';

import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';
import { BrowserRouter, Switch } from 'react-router-dom';

import Auth from './utils/auth';

import publicRoutes from './views';

const httpLink = createHttpLink({ uri: '/graphql' });

const authLink = setContext((_, { headers }) => {
  return { headers: { ...headers, JWT: Auth.jwtToken } };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          bans: relayStylePagination(['orderBy', 'orderDirection']),
          steamUsers: relayStylePagination(['orderBy', 'orderDirection'])
        }
      }
    }
  })
});

client.defaultOptions = {
  watchQuery: {
    errorPolicy: 'all'
  },
  query: {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network'
  },
  mutate: {
    errorPolicy: 'all'
  }
};

export default function () {
  const [initialSetup, setInitialSetup] = useState(false);

  useEffect(() => {
    Auth.restoreAuth();
    setInitialSetup(true);
  }, []);

  return initialSetup ? (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>{publicRoutes}</Switch>
      </BrowserRouter>
    </ApolloProvider>
  ) : null;
}
