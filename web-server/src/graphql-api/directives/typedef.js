import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  directive @systemAdminOnly on FIELD_DEFINITION
`;
