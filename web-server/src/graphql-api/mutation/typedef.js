import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type Mutation {
    createOrganization(
      name: String!
      contact: String!
      appeal: String!
    ): Organization @systemAdminOnly

    updateOrganization(
      _id: String!
      name: String!
      contact: String!
      appeal: String!
    ): Organization @systemAdminOnly

    addBanList(
      name: String!
      type: String!
      organization: String!
      battlemetricsID: String
    ): BanList @systemAdminOnly

    updateBanList(
      _id: String!
      name: String!
      type: String!
      organization: String!
      battlemetricsID: String
    ): BanList @systemAdminOnly

    createExportBanList(
      name: String!
      config: String!
      battlemetricsEnabled: Boolean!
    ): ExportBanList
    updateExportBanList(
      _id: String!
      name: String!
      config: String!
    ): ExportBanList
    deleteExportBanList(_id: String): ExportBanList
  }
`;
