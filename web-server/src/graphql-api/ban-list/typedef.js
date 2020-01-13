import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type BanList {
    _id: String

    name: String
    type: String
    lastImported: Date

    organization: Organization

    banCount: Int
    uniqueBannedSteamIDCount: Int

    playerBans(steamID: String!, expired: Boolean): [Ban]

    battlemetricsID: String
  }
`;
