import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type Mutation {
    createOrganization(
      name: String!
      contact: String!
      appeal: String!
    ): Organization @systemAdminOnly

    addBattlemetricsBanList(
      id: String!
      name: String!
      organization: String!
    ): BattlemetricsBanList @systemAdminOnly

    createExportBanList(name: String!, config: String!): ExportBanList
    deleteExportBanList(_id: String): ExportBanList
  }
`;
