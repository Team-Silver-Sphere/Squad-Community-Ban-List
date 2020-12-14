import { resolver as banResolver } from './ban/index.js';
import { resolver as banListResolver } from './ban-list/index.js';
import { resolver as coreResolver } from './core/index.js';
import { resolver as exportBanListResolver } from './export-ban-list/index.js';
import { resolver as mutationResolver } from './mutation/index.js';
import { resolver as organisationResolver } from './organisation/index.js';
import { resolver as queryResolver } from './query/index.js';
import { resolver as steamUserResolver } from './steam-user/index.js';

export default [
  banResolver,
  banListResolver,
  coreResolver,
  exportBanListResolver,
  mutationResolver,
  organisationResolver,
  queryResolver,
  steamUserResolver
];
