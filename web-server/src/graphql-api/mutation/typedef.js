import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type Mutation {
    createExportBanList(
      name: String!
      server: String!
      type: String!
      threshold: Int
      defaultActivePoints: Int
      defaultExpiredPoints: Int
      maxBanAge: Int
      discordWebhook: String
    ): ExportBanList

    updateExportBanList(
      id: Int!
      name: String
      server: String
      threshold: Int
      defaultActivePoints: Int
      defaultExpiredPoints: Int
      maxBanAge: Int
      discordWebhook: String
    ): ExportBanList

    deleteExportBanList(id: Int!): ExportBanList

    createExportBanListConfig(
      exportBanList: Int!
      banList: Int!
      activePoints: Int
      expiredPoints: Int
    ): ExportBanListConfig

    deleteExportBanListConfig(id: Int!): ExportBanListConfig
  }
`;
