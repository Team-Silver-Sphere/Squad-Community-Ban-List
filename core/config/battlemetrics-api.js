import Bottleneck from 'bottleneck';

import { battlemetricsAPIKey } from './secrets.js';

const battlemetricsAPIHostname = 'https://api.battlemetrics.com';

const battlemetricsOrganization = '14987';

const rateLimiter = new Bottleneck({
  reservoir: 40,
  reservoirRefreshAmount: 40,
  reservoirRefreshInterval: 60 * 1000
});

export {
  battlemetricsAPIKey,
  battlemetricsAPIHostname,
  battlemetricsOrganization,
  rateLimiter
};
