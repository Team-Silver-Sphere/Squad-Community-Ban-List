import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  """
  The ExportBan type represents an export ban, a ban that is exported from the system.
  """
  type ExportBan {
    """
    MongoDB Document ID
    """
    _id: String

    """
    The SteamID of the banned player.
    """
    steamID: String
  }
`;
