import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type ExportBanList {
    id: Int
    server: String
    name: String
    threshold: Int
    defaultActivePoints: Int
    defaultExpiredPoints: Int
    owner: SteamUser
    exportBanListConfigs: [ExportBanListConfig]
  }
`;
