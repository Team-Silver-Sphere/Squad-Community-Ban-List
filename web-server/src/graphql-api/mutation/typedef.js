import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type Mutation {
    createExportBanList(
      name: String!
      server: String!
      defaultActiveWeight: Int
      defaultExpiredWeight: Int
    ): ExportBanList
    deleteExportBanList(id: Int!): ExportBanList
  }
`;
