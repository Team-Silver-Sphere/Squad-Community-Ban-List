import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type Organization {
    _id: String
    name: String

    battlemetricsBanLists: [BattlemetricsBanList]

    uniqueBannedSteamIDCount: Int
  }
`;
