import axios from 'axios';

import {
  battlemetricsAPIKey,
  rateLimiter
} from '../config/battlemetrics-api.js';

const makeRequest = rateLimiter.wrap(async reqURL => {
  return (
    await axios.get(reqURL, {
      headers: {
        Authorization: `Bearer ${battlemetricsAPIKey}`
      }
    })
  ).data;
});

export default function(reqURL, priority = 5) {
  return makeRequest.withOptions({ priority }, reqURL);
}
