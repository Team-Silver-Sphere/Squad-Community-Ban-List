import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  enum OrderDirection {
    ASC
    DESC
  }

  enum BanOrderBy {
    created
  }
`;
