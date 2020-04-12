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

    """
    The current status of the Battlemetrics ban associated with the export ban.

    Accessible to system admins only.
    """
    battlemetricsStatus: String @systemAdminOnly

    """
    The export ban list the export ban belongs to.
    """
    exportBanList: ExportBanList
  }
`;
