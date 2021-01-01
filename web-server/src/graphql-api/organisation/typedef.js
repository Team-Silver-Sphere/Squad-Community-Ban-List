import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type Organisation {
    id: Int
    name: String
    discord: String

    banLists: [BanList]
  }
`;
