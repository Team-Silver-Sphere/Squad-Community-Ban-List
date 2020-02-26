import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  """
  The BanList type represents a ban list, a source of Bans.
  """
  type BanList {
    """
    MongoDB Document ID
    """
    _id: String

    """
    The name of the ban list.
    """
    name: String

    """
    The type of ban list, i.e. what kind of source it is, e.g. BattleMetrics.
    """
    type: String

    """
    The date when the ban list was last imported.
    """
    lastImported: Date

    """
    The Organization that owns the ban list.
    """
    organization: Organization

    """
    The number of Bans imported from the ban list.
    """
    banCount: Int

    """
    The number of unique SteamIDs imported from the ban list.
    """
    uniqueBannedSteamIDCount: Int

    """
    An array of Bans from the ban list belonging to a specified SteamID.
    """
    playerBans(steamID: String!, expired: Boolean): [Ban]

    """
    The BattleMetrics ID of the ban list.

    Accessible to system admins only.
    """
    battlemetricsID: String @systemAdminOnly
  }
`;
