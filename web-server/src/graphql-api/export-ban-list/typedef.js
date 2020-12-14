import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type ExportBanList {
    id: Int
    server: String
    name: String
    defaultActiveWeight: Int
    defaultExpiredWeight: Int
    owner: SteamUser
  }
`;
