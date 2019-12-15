import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type BattlemetricsBanList {
    _id: String
    id: String
    name: String

    organization: Organization

    battlemetricsBanCount: Int

    uniqueBannedSteamIDCount: Int
  }
`;
