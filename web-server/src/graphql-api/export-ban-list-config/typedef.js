import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type ExportBanListConfig {
    id: Int
    activePoints: Int
    expiredPoints: Int

    exportBanList: ExportBanList
    banList: BanList
  }
`;
