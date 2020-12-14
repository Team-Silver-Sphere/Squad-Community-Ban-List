import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type SteamUser {
    id: String
    name: String
    profileURL: String
    avatar: String
    avatarMedium: String
    avatarFull: String

    reputationPoints: Int
    reputationRank: Int
    lastRefreshedInfo: Date
    lastRefreshedReputationPoints: Date
    lastRefreshedReputationRank: Date

    bans(
      first: Int
      after: String
      last: Int
      before: String
      orderBy: String
      orderDirection: OrderDirection
      expired: Boolean
    ): BanConnection

    exportBanLists: [ExportBanList]
  }

  type SteamUserConnection {
    edges: [SteamUserEdge]
    pageInfo: PageInfo
  }

  type SteamUserEdge {
    cursor: String
    node: SteamUser
  }
`;
