import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type ExportBanList {
    _id: String

    name: String
    config: String
    banCount: Int
    owner: SteamUser

    battlemetricsStatus: String
    battlemetricsInvite: String

    lastFetched: Date
  }
`;
