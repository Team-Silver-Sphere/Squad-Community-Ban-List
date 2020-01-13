import connectToDB from 'database/utils/connect';
import BanExporter from './src/ban-generator.js';

const generator = new BanExporter();
connectToDB().then(() => generator.run());
