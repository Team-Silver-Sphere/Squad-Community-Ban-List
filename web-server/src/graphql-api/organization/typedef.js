import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type Organization {
    _id: String
    name: String
    contact: String
    appeal: String

    battlemetricsBanLists: [BattlemetricsBanList]

    uniqueBannedSteamIDCount: Int
  }
`;
