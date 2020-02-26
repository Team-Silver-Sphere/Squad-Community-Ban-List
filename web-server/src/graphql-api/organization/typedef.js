import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  """
  The Organization type represents a partner organisation that we import bans from.
  """
  type Organization {
    """
    MongoDB Document ID
    """
    _id: String

    """
    The name of the organization.
    """
    name: String

    """
    Contact information for the organization.

    Accessible to system admins only.
    """
    contact: String @systemAdminOnly

    """
    Details on the appeal process for the organization.
    """
    appeal: String

    """
    Whether the list is official, a.k.a. run by SCBL.
    """
    official: Boolean

    """
    The number of Bans imported from the organization's ban lists.
    """
    banCount: Int

    """
    The number of unique SteamIDs imported from the organization's ban lists.
    """
    uniqueBannedSteamIDCount: Int

    """
    An array of BanLists belonging to the organization.
    """
    banLists: [BanList]
  }
`;
