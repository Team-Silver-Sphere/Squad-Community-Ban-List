import axios from 'axios';
import Bottleneck from 'bottleneck';

import { BATTLEMETRICS_API_KEY, BATTLEMETRICS_API_RESERVIOR } from '../config.js';

if (!BATTLEMETRICS_API_KEY)
  throw new Error('Environmental variable BATTLEMETRICS_API_KEY must be provided.');

const makeRequest = new Bottleneck({
  reservoir: BATTLEMETRICS_API_RESERVIOR,
  reservoirRefreshAmount: BATTLEMETRICS_API_RESERVIOR,
  reservoirRefreshInterval: 60 * 1000
}).wrap(async (method, endpoint, params, data) => {
  return axios({
    method,
    url: 'https://api.battlemetrics.com/' + endpoint,
    params,
    data,
    headers: { Authorization: `Bearer ${BATTLEMETRICS_API_KEY}` }
  });
});

export default async function (method, url, params, data = {}, priority = 5) {
  return makeRequest.withOptions({ priority }, method, url, params, data);
}
