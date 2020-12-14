import { typedef as banTypeDef } from './ban/index.js';
import { typedef as banListTypeDef } from './ban-list/index.js';
import { typedef as coreTypeDef } from './core/index.js';
import { typedef as exportBanListTypeDef } from './export-ban-list/index.js';
import { typedef as mutationTypeDef } from './mutation/index.js';
import { typedef as organisationTypeDef } from './organisation/index.js';
import { typedef as queryTypeDef } from './query/index.js';
import { typedef as steamUserTypeDef } from './steam-user/index.js';
import enumTypeDef from './enums.js';

export default [
  banTypeDef,
  banListTypeDef,
  coreTypeDef,
  exportBanListTypeDef,
  mutationTypeDef,
  organisationTypeDef,
  queryTypeDef,
  steamUserTypeDef,
  enumTypeDef
];
