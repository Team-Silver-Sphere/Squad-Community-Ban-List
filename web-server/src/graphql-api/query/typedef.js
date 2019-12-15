import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type Query {
    organizations: [Organization]
    organizationCount: Int

    battlemetricsBanLists: [BattlemetricsBanList]
    battlemetricsBanListCount: Int

    battlemetricsBanCount: Int

    uniqueBannedSteamIDCount: Int
  }
`;
