import querystring from 'querystring';

import { battlemetrics } from '../apis/index.js';
import { classifyBanReason } from '../utils/index.js';

const PAGE_SIZE = 100;

export default async function (source) {
  let params = { 'filter[banList]': source, 'page[size]': PAGE_SIZE };

  const bans = [];
  while (true) {
    const { data } = await battlemetrics('get', 'bans', params);

    for (const ban of data.data) {
      // get the steamID of the player banned.
      let steamUser;
      // loop through identifiers to get steamID.
      for (const identifier of ban.attributes.identifiers) {
        if (identifier.type !== 'steamID') continue;

        // some show steam url instead of usual format so handle that case.
        if (identifier.identifier)
          steamUser = identifier.identifier.replace('https://steamcommunity.com/profiles/', '');
        else if (identifier.metadata) steamUser = identifier.metadata.profile.steamid;
        else continue;

        break;
      }

      // sometimes there is no steamID in the response, so do not add the ban to the DB.
      if (steamUser == null) continue;

      const created = new Date(ban.attributes.timestamp);
      const expires = ban.attributes.expires ? new Date(ban.attributes.expires) : null;

      bans.push({
        id: ban.attributes.uid,
        steamUser,

        created: created,
        expires: expires,
        expired: !(ban.attributes.expires === null || expires.getTime() > Date.now()),
        reason: classifyBanReason(`${ban.attributes.reason} ${ban.attributes.note}`)
      });
    }

    if (!data.links.next) break;

    params = querystring.parse(data.links.next.split('?')[1], null, null, {
      decodeURIComponent: true
    });
  }

  return bans;
}
