import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type BanList {
    id: Int
    name: String
    organisation: Organisation
  }
`;
