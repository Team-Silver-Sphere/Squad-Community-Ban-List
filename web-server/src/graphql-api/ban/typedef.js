import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type Ban {
    id: String
    steamUser: SteamUser
    created: Date
    expires: Date
    expired: Boolean
    reason: String
    banList: BanList
  }

  type BanConnection {
    edges: [BanEdge]
    pageInfo: PageInfo
  }

  type BanEdge {
    cursor: String
    node: Ban
  }
`;
