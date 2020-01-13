import axios from 'axios';

import {
  battlemetricsAPIKey,
  rateLimiter
} from '../config/battlemetrics-api.js';

const makeRequest = rateLimiter.wrap(async (method, reqURL, data) => {
  if (method === 'get') {
    return (
      await axios.get(reqURL, {
        headers: {
          Authorization: `Bearer ${battlemetricsAPIKey}`
        }
      })
    ).data;
  }

  if (method === 'post') {
    return (
      await axios.post(reqURL, data, {
        headers: {
          Authorization: `Bearer ${battlemetricsAPIKey}`
        }
      })
    ).data;
  }
});

export default function(method, reqURL, data = {}, priority = 5) {
  return makeRequest.withOptions({ priority }, method, reqURL, data);
}
