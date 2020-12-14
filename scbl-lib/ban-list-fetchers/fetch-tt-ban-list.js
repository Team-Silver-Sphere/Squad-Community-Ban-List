import axios from 'axios';
import { classifyBanReason } from '../utils/index.js';

export default async function (source) {
  const { data } = await axios.get(source);

  const bans = [];
  for (const ban of data) {
    const startDate = new Date(ban.start_datetime);
    const endDate = ban.end_datetime ? new Date(ban.end_datetime) : null;

    bans.push({
      id: `${ban.steam_id},${ban.start_datetime}`,
      steamUser: ban.steam_id,
      created: startDate,
      expires: endDate,
      expired: (endDate !== null && endDate.getTime() < Date.now()) || ban.lifted,
      reason: classifyBanReason(ban.reason)
    });
  }

  return bans;
}
