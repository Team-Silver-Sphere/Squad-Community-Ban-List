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
    The BanList the ban was imported from.
    """
    banList: BanList

    """
    The BattleMetrics UID of the ban.
    
    Accessible to system admins only.
    """
    battlemetricsUID: String @systemAdminOnly
    
    """
    The BattleMetrics Timestamp of the ban.
    
    Accessible to system admins only.
    """
    battlemetricsTimestamp: Date
    
    """
    The BattleMetrics expiry date of the ban.
    
    Accessible to system admins only.
    """
    battlemetricsExpires: Date
    
    """
    The BattleMetrics reason of the ban.
    
    Accessible to system admins only.
    """
    battlemetricsReason: String @systemAdminOnly
    
    """
    The BattleMetrics note of the ban.
    
    Accessible to system admins only.
    """
    battlemetricsNote: String @systemAdminOnly
  }
`;
