import axios from 'axios';
import querystring from 'querystring';

import { battlemetrics } from 'scbl-lib/apis';
import { Logger } from 'scbl-lib/utils';

import RawBan from './raw-ban.js';

export default class BanFetcher {
  constructor(store) {
    if (store) {
      this.store = store;
      this.queue = true;
    } else {
      this.store = [];
      this.queue = false;
    }
  }

  async fetchBanList(banList) {
    Logger.verbose('BanFetcher', 1, `Fetching ban list (ID: ${banList.id}...`);
    switch (banList.type) {
      case 'remote':
        await this.fetchRemoteBanList(banList);
        break;
      case 'battlemetrics':
        await this.fetchBattlemetricsBanList(banList);
        break;
      case 'tt':
        await this.fetchTTBanList(banList);
        break;
      default:
        throw new Error('Unsupported ban list type.');
    }

    if (!this.queue) return this.store;
  }

  async fetchRemoteBanList(banList) {
    // Fetch ban data.
    Logger.verbose(
      'BanFetching',
      1,
      `Fetching remote ban list data for ban list (ID: ${banList.id}...`
    );
    const { data } = await axios.get(banList.source);

    // Loop over each line of the ban file.
    for (const line of data.split('\n')) {
      // Split the line to get the steam user, expiry data and reason.
      let [match, steamUser, expires, reason] = line.match(/([0-9]{17}):([0-9]+) ?\/\/(.+)/);

      // Skip the line if there's no match, i.e. no ban is contained on the line.
      if (!match) continue;

      // Turn the expiry data into a date object or null for perm bans.
      expires = parseInt(expires);
      expires = expires ? new Date(expires * 1000) : null;

      // Store the new ban.
      const rawBan = new RawBan(banList, {
        id: `${banList.id},${steamUser},${expires ? expires.getTime() : 'null'}`,

        steamUser: steamUser,

        expires: expires,
        expired: !(expires === null || expires.getTime() > Date.now()),

        reason: reason
      });

      Logger.verbose(
        'BanFetcher',
        1,
        `Queuing ban (ID: ${rawBan.id}) from ban list (ID: ${banList.id}) to be saved...`
      );
      this.store.push(rawBan);
    }
  }

  async fetchBattlemetricsBanList(banList) {
    // Setup the initial parameters for the first fetch.
    let params = { 'filter[banList]': banList.source, 'page[size]': 100 };

    // Loop until there's no more pages to fetch.
    while (true) {
      // Get the ban page's data.
      Logger.verbose(
        'BanFetching',
        1,
        `Fetching Battlemetrics ban list data for ban list (ID: ${banList.id}...`
      );
      const { data } = await battlemetrics('get', 'bans', params);

      // Loop over each ban in the page's data.
      for (const ban of data.data) {
        // Get the SteamID of the player banned.
        let steamUser;
        // Loop through identifiers to get steamID.
        for (const identifier of ban.attributes.identifiers) {
          // Ignore none SteamID identifiers.
          if (identifier.type !== 'steamID') continue;

          // Some show steam url instead of usual format so handle that case.
          if (identifier.identifier)
            steamUser = identifier.identifier.replace('https://steamcommunity.com/profiles/', '');
          else if (identifier.metadata) steamUser = identifier.metadata.profile.steamid;
          else continue;

          break;
        }

        // Sometimes there is no SteamID in the response. If this is the case we ignore the ban.
        if (steamUser == null) continue;

        // Turn the dates into date objects or null if permanent ban.
        const created = new Date(ban.attributes.timestamp);
        const expires = ban.attributes.expires ? new Date(ban.attributes.expires) : null;

        // Store the ban.
        const rawBan = new RawBan(banList, {
          id: `${banList.id},ban.attributes.uid`,

          steamUser,

          created: created,
          expires: expires,
          expired: !(ban.attributes.expires === null || expires.getTime() > Date.now()),

          reason: `${ban.attributes.reason} ${ban.attributes.note}`
        });

        Logger.verbose(
          'BanFetcher',
          1,
          `Queuing ban (ID: ${rawBan.id}) from ban list (ID: ${banList.id}) to be saved...`
        );
        this.store.push(rawBan);
      }

      // If that is the last page then break out the loop.
      if (!data.links.next) break;

      // Store the parameters for the next page fetch.
      params = querystring.parse(data.links.next.split('?')[1], null, null, {
        decodeURIComponent: true
      });
    }
  }

  async fetchTTBanList(banList) {
    // Fetch ban data.
    Logger.verbose(
      'BanFetching',
      1,
      `Fetching TT ban list data for ban list (ID: ${banList.id}...`
    );
    const { data } = await axios.get(banList.source);

    for (const ban of data) {
      // Turn the dates into date objects or null if permanent ban.
      const startDate = new Date(ban.start_datetime);
      const endDate = ban.end_datetime ? new Date(ban.end_datetime) : null;

      // Store the ban.
      const rawBan = new RawBan(banList, {
        id: `${banList.id},${ban.steam_id},${ban.start_datetime}`,

        steamUser: ban.steam_id,

        created: startDate,
        expires: endDate,
        expired: (endDate !== null && endDate.getTime() < Date.now()) || ban.lifted,

        reason: ban.reason
      });

      Logger.verbose(
        'BanFetcher',
        1,
        `Queuing ban (ID: ${rawBan.id}) from ban list (ID: ${banList.id}) to be saved...`
      );
      this.store.push(rawBan);
    }
  }
}
