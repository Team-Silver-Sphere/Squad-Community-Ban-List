import axios from 'axios';

import { STEAM_API_KEY } from '../config.js';

if (!STEAM_API_KEY) throw new Error('Environmental variable STEAM_API_KEY must be provided.');

export default async function (method, url, params, data = {}) {
  return axios({
    method,
    url: 'http://api.steampowered.com/' + url,
    params: { ...params, key: STEAM_API_KEY },
    data
  });
}
