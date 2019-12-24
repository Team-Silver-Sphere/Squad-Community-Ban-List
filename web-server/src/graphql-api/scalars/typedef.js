import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  scalar Date
`;
