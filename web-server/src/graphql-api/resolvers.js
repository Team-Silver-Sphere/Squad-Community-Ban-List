import { resolver as banResolver } from './ban/index.js';
import { resolver as banListResolver } from './ban-list/index.js';
import { resolver as exportBanResolver } from './export-ban/index.js';
import { resolver as exportBanListResolver } from './export-ban-list/index.js';
import { resolver as mutationResolver } from './mutation/index.js';
import { resolver as organizationResolver } from './organization/index.js';
import { resolver as queryResolver } from './query/index.js';
import { resolver as scalarsResolver } from './scalars/index.js';
import { resolver as steamUserResolver } from './steam-user/index.js';

export default [
  banResolver,
  banListResolver,
  exportBanResolver,
  exportBanListResolver,
  mutationResolver,
  organizationResolver,
  queryResolver,
  scalarsResolver,
  steamUserResolver
];
