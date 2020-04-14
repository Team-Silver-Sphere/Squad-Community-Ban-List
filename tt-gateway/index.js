import connectToDB from 'database/utils/connect';
import TTGateway from './src/gateway.js';

const gateway = new TTGateway();

connectToDB().then(() => gateway.run());
