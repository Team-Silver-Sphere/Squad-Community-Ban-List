import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type ExportBanList {
    id: Int
    name: String
    server: String

    type: String

    threshold: Int
    defaultActivePoints: Int
    defaultExpiredPoints: Int
    maxBanAge: Int

    discordWebhook: String

    battlemetricsID: String
    battlemetricsInvite: String

    owner: SteamUser

    exportBanListConfigs: [ExportBanListConfig]
  }
`;
