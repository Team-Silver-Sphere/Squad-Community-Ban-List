import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type SteamUser {
    _id: String
    steamID: String
    displayName: String
    avatarMedium: String
    avatarFull: String
    systemAdmin: Boolean @systemAdminOnly
    exportBanLists: [ExportBanList]
    exportBanListsLimit: Int
  }
`;
