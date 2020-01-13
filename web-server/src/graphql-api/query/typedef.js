import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type Query {
    organizations: [Organization]
    organizationCount: Int

    banLists: [BanList]
    banListCount: Int

    banCount: Int
    uniqueBannedSteamIDCount: Int

    currentSteamUser: SteamUser
  }
`;
