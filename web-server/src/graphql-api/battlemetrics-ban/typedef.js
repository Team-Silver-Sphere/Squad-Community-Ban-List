import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type BattlemetricsBan {
    _id: String
    uid: String @systemAdminOnly
    reason: String @systemAdminOnly
    note: String @systemAdminOnly
    steamID: String

    battlemetricsBanList: BattlemetricsBanList
  }
`;
