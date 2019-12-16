import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type Mutation {
    createOrganization(
      name: String!
      contact: String!
      appeal: String!
    ): Organization
    addBattlemetricsBanList(
      id: String!
      name: String!
      organization: String!
    ): BattlemetricsBanList
  }
`;
