import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type Query {
    organisations: [Organisation]
    banLists: [BanList]

    bans(
      first: Int
      after: String
      last: Int
      before: String
      orderBy: String
      orderDirection: OrderDirection
    ): BanConnection

    steamUsers(
      first: Int
      after: String
      last: Int
      before: String
      orderBy: String
      orderDirection: OrderDirection
    ): SteamUserConnection

    steamUser(id: String!): SteamUser

    loggedInSteamUser: SteamUser
  }
`;
