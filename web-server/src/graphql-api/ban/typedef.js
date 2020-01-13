import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type Ban {
    _id: String

    steamID: String
    banList: BanList

    battlemetricsUID: String @systemAdminOnly
    battlemetricsTimestamp: Date
    battlemetricsExpires: Date
    battlemetricsReason: String @systemAdminOnly
    battlemetricsNote: String @systemAdminOnly
  }
`;
