import Bottleneck from 'bottleneck';

import { battlemetricsAPIKey } from './secrets.js';

const battlemetricsAPIHostname = 'https://api.battlemetrics.com/';

const rateLimiter = new Bottleneck({
  reservoir: 60,
  reservoirRefreshAmount: 60,
  reservoirRefreshInterval: 60 * 1000
});

export { battlemetricsAPIKey, battlemetricsAPIHostname, rateLimiter };
