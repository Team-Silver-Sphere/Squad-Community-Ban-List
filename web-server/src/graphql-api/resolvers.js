import { resolver as battlemetricsBanListResolver } from './battlemetrics-ban-list/index.js';
import { resolver as mutationResolver } from './mutation/index.js';
import { resolver as organizationResolver } from './organization/index.js';
import { resolver as queryResolver } from './query/index.js';

export default [
  battlemetricsBanListResolver,
  mutationResolver,
  organizationResolver,
  queryResolver
];