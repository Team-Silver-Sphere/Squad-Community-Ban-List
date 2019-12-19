import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type BattlemetricsBan {
    _id: String
    uid: String
    reason: String
    note: String
    steamID: String

    battlemetricsBanList: BattlemetricsBanList
  }
`;
