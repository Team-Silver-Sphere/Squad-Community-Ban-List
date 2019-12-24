import { resolver as battlemetricsBanResolver } from './battlemetrics-ban/index.js';
import { resolver as battlemetricsBanListResolver } from './battlemetrics-ban-list/index.js';
import { resolver as exportBanListResolver } from './export-ban-list/index.js';
import { resolver as mutationResolver } from './mutation/index.js';
import { resolver as organizationResolver } from './organization/index.js';
import { resolver as queryResolver } from './query/index.js';
import { resolver as scalarsResolver } from './scalars/index.js';
import { resolver as steamUserResolver } from './steam-user/index.js';

export default [
  battlemetricsBanResolver,
  battlemetricsBanListResolver,
  exportBanListResolver,
  mutationResolver,
  organizationResolver,
  queryResolver,
  scalarsResolver,
  steamUserResolver
];
