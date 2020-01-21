# Schema Types

<details>
  <summary><strong>Table of Contents</strong></summary>

  * [Query](#query)
  * [Mutation](#mutation)
  * [Objects](#objects)
    * [Ban](#ban)
    * [BanList](#banlist)
    * [ExportBanList](#exportbanlist)
    * [Organization](#organization)
    * [SteamUser](#steamuser)
  * [Scalars](#scalars)
    * [Boolean](#boolean)
    * [Date](#date)
    * [Int](#int)
    * [String](#string)

</details>

## Query
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>organizations</strong></td>
<td valign="top">[<a href="#organization">Organization</a>]</td>
<td>

An array of all partner Organizations.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>organizationCount</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The number of partner organizations within the system.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>banLists</strong></td>
<td valign="top">[<a href="#banlist">BanList</a>]</td>
<td>

An array of all BanLists.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>banListCount</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The number of ban lists within the system.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>banCount</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The number of Bans within the system.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>uniqueBannedSteamIDCount</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The number of unique SteamIDs stored within the system.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>playerBans</strong></td>
<td valign="top">[<a href="#ban">Ban</a>]</td>
<td>

An array of Bans belonging to a specified SteamID.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">steamID</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">expired</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>currentSteamUser</strong></td>
<td valign="top"><a href="#steamuser">SteamUser</a></td>
<td>

The currently authenticated user's SteamUser profile.

</td>
</tr>
</tbody>
</table>

## Mutation
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>createOrganization</strong></td>
<td valign="top"><a href="#organization">Organization</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">name</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">contact</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">appeal</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updateOrganization</strong></td>
<td valign="top"><a href="#organization">Organization</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">_id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">name</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">contact</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">appeal</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addBanList</strong></td>
<td valign="top"><a href="#banlist">BanList</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">name</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">type</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">organization</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">battlemetricsID</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updateBanList</strong></td>
<td valign="top"><a href="#banlist">BanList</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">_id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">name</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">type</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">organization</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">battlemetricsID</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createExportBanList</strong></td>
<td valign="top"><a href="#exportbanlist">ExportBanList</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">name</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">config</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">battlemetricsEnabled</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updateExportBanList</strong></td>
<td valign="top"><a href="#exportbanlist">ExportBanList</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">_id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">name</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">config</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteExportBanList</strong></td>
<td valign="top"><a href="#exportbanlist">ExportBanList</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">_id</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

## Objects

### Ban

The Ban type represents a ban imported from one of our partner organisation's ban lists. 

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

MongoDB Document ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>steamID</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

SteamID of the banned player.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>banList</strong></td>
<td valign="top"><a href="#banlist">BanList</a></td>
<td>

The BanList the ban was imported from.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>battlemetricsUID</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The BattleMetrics UID of the ban.

Accessible to system admins only.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>battlemetricsTimestamp</strong></td>
<td valign="top"><a href="#date">Date</a></td>
<td>

The BattleMetrics Timestamp of the ban.

Accessible to system admins only.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>battlemetricsExpires</strong></td>
<td valign="top"><a href="#date">Date</a></td>
<td>

The BattleMetrics expiry date of the ban.

Accessible to system admins only.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>battlemetricsReason</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The BattleMetrics reason of the ban.

Accessible to system admins only.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>battlemetricsNote</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The BattleMetrics note of the ban.

Accessible to system admins only.

</td>
</tr>
</tbody>
</table>

### BanList

The BanList type represents a ban list, a source of Bans. 

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

MongoDB Document ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The name of the ban list.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>type</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The type of ban list, i.e. what kind of source it is, e.g. BattleMetrics.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastImported</strong></td>
<td valign="top"><a href="#date">Date</a></td>
<td>

The date when the ban list was last imported.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>organization</strong></td>
<td valign="top"><a href="#organization">Organization</a></td>
<td>

The Organization that owns the ban list.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>banCount</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The number of Bans imported from the ban list.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>uniqueBannedSteamIDCount</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The number of unique SteamIDs imported from the ban list.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>playerBans</strong></td>
<td valign="top">[<a href="#ban">Ban</a>]</td>
<td>

An array of Bans from the ban list belonging to a specified SteamID.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">steamID</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">expired</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>battlemetricsID</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The BattleMetrics ID of the ban list.

Accessible to system admins only.

</td>
</tr>
</tbody>
</table>

### ExportBanList

The ExportBanList type represents an export ban list, a way of exporting a list of banned players from the system. 

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

MongoDB Document ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The name of the export ban list.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>config</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The config / criteria of the export ban list.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>banCount</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The number of bans / unique SteamIDs listed within the export ban list.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>owner</strong></td>
<td valign="top"><a href="#steamuser">SteamUser</a></td>
<td>

The SteamUser that owns the export ban list.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>battlemetricsStatus</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The current status of the associated BattleMetrics ban list.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>battlemetricsInvite</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

An invite to the associated BattleMetrics ban list.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastFetched</strong></td>
<td valign="top"><a href="#date">Date</a></td>
<td>

The date of when the remote ban list was last fetched.

</td>
</tr>
</tbody>
</table>

### Organization

The Organization type represents a partner organisation that we import bans from. 

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

MongoDB Document ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The name of the organization.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>contact</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Contact information for the organization.

Accessible to system admins only.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>appeal</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Details on the appeal process for the organization.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>banCount</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The number of Bans imported from the organization's ban lists.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>uniqueBannedSteamIDCount</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The number of unique SteamIDs imported from the organization's ban lists.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>banLists</strong></td>
<td valign="top">[<a href="#banlist">BanList</a>]</td>
<td>

An array of BanLists belonging to the organization.

</td>
</tr>
</tbody>
</table>

### SteamUser

The SteamUser type represents a Steam user that has logged in to the system. 

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

MongoDB Document ID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>steamID</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The user's SteamID.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>displayName</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The user's display name.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>avatarMedium</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A URL to a copy of the user's medium sized avatar.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>avatarFull</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A URL to a copy of the user's full sized avatar.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>systemAdmin</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Whether the user is a system admin.

Accessible to system admins only.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>exportBanLists</strong></td>
<td valign="top">[<a href="#exportbanlist">ExportBanList</a>]</td>
<td>

An array of ExportBanLists belonging to the user.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>exportBanListsLimit</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The limit of the number of ExportBanLists the user can create.

</td>
</tr>
</tbody>
</table>

## Scalars

### Boolean

The `Boolean` scalar type represents `true` or `false`.

### Date

Date custom scalar type

### Int

The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.

### String

The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.

