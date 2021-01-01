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
    lastRefreshedInfo: Date

    reputationPoints: Int
    reputationPointsMonthBefore: Int
    reputationPointsMonthChange: Int
    lastRefreshedReputationPoints: Date
    riskRating: Float
    reputationRank: Int
    lastRefreshedReputationRank: Date

    lastViewed: Date

    bans(
      first: Int
      after: String
      last: Int
      before: String
      orderBy: String
      orderDirection: OrderDirection
      expired: Boolean
    ): BanConnection

    exportBanList(id: Int!): ExportBanList
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
