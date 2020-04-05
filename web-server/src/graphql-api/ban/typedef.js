import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  """
  The Ban type represents a ban imported from one of our partner organisation's ban lists.
  """
  type Ban {
    """
    MongoDB Document ID
    """
    _id: String

    """
    SteamID of the banned player.
    """
    steamID: String

    """
    The date the ban was created.
    """
    created: Date

    """
    The date the ban expires.
    """
    expires: Date

    """
    Whether the ban has expired.
    """
    expired: Boolean

    """
    An array of strings that classify the reason of the ban.
    """
    reason: [String]

    """
    The BanList the ban was imported from.
    """
    banList: BanList
  }
`;
