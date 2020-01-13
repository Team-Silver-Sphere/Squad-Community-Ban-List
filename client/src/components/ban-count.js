import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const query = gql`
  query {
    banCount
  }
`;

export default function() {
  return (
    <Query query={query} onError={() => {}}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return 'Error...';
        return data.banCount;
      }}
    </Query>
  );
}
