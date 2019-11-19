import BanImporter from './src/ban-importer.js';

import { banImporter as config } from '../config.mjs';

const importer = new BanImporter(config);
importer.run();
