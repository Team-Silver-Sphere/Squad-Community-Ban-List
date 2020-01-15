import connectToDB from 'database/utils/connect';
import BattlemetricsGateway from './src/gateway.js';

const gateway = new BattlemetricsGateway();

connectToDB().then(() => gateway.run());
