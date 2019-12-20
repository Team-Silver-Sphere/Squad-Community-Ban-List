import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type ExportBanList {
    _id: String
    owner: SteamUser
    name: String
    config: String
  }
`;
