import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type Query {
    organizations: [Organization]
    
    battlemetricsBanLists: [BattlemetricsBanList]
  }
`;