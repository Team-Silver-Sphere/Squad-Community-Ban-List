import sleep from 'core/utils/sleep';

import BanListManager from './ban-list-manager.js';
import BanManager from './ban-manager.js';
import BanImporter from './ban-importer.js';

export default class Gateway {
  constructor() {
    this.banListManager = new BanListManager();
    this.banManager = new BanManager();
    this.banImporter = new BanImporter();

    this.sleepPeriod = 10 * 1000;
  }

  async run() {
    while (true) {
      if (await this.banListManager.hasWork()) {
        await this.banListManager.doWork();
      } else if (await this.banManager.hasWork()) {
        await this.banManager.doWork();
      } else if (await this.banImporter.hasWork()) {
        await this.banImporter.doWork();
      } else {
        console.log('No work found. Sleeping...');
        await sleep(this.sleepPeriod);
      }
    }
  }
}
