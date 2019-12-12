import connectToDB from 'database/utils/connect';
import BanImporter from './src/ban-importer.js';

const importer = new BanImporter();

connectToDB().then(() => importer.run());
