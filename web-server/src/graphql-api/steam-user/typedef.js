import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  """
  The SteamUser type represents a Steam user that has logged in to the system.
  """
  type SteamUser {
    """
    MongoDB Document ID
    """
    _id: String

    """
    The user's SteamID.
    """
    steamID: String

    """
    The user's display name.
    """
    displayName: String

    """
    A URL to a copy of the user's medium sized avatar.
    """
    avatarMedium: String

    """
    A URL to a copy of the user's full sized avatar.
    """
    avatarFull: String

    """
    Whether the user is a system admin.

    Accessible to system admins only.
    """
    systemAdmin: Boolean @systemAdminOnly

    """
    An array of ExportBanLists belonging to the user.
    """
    exportBanLists: [ExportBanList]

    """
    The limit of the number of ExportBanLists the user can create.
    """
    exportBanListsLimit: Int
  }
`;
