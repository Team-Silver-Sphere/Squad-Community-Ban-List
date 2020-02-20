import ApolloServerKoa from 'apollo-server-koa';
const { gql } = ApolloServerKoa;

export default gql`
  type Query {
    """
    An array of all partner Organizations.
    """
    organizations: [Organization]
    
    """
    The number of partner organizations within the system.
    """
    organizationCount: Int

    """
    An array of all BanLists.
    """
    banLists: [BanList]
    
    """
    The number of ban lists within the system.
    """
    banListCount: Int

    """
    The number of Bans within the system.
    """
    banCount: Int
    
    """
    The number of unique SteamIDs stored within the system.
    """
    uniqueBannedSteamIDCount: Int,
    
    """
    An array of Bans belonging to a specified SteamID.
    """
    playerBans(steamID: String!, expired: Boolean): [Ban]
    
    """
    The number of bans being exported by SCBL.
    """
    exportBanCount: Int

    """
    The currently authenticated user's SteamUser profile.
    """
    currentSteamUser: SteamUser
  }
`;
