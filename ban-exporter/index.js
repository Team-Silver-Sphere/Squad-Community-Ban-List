import connectToDB from 'database/utils/connect';
import BanExporter from './src/ban-exporter.js';

const exporter = new BanExporter();
connectToDB().then(() => exporter.run());
