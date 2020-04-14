import sleep from 'core/utils/sleep';

import BanImporter from './ban-importer.js';

export default class Gateway {
  constructor() {
    this.banImporter = new BanImporter();

    this.sleepPeriod = 60 * 1000;
  }

  async run() {
    while (true) {
      if (await this.banImporter.hasWork()) {
        await this.banImporter.doWork();
      } else {
        console.log('No work found. Sleeping...');
        await sleep(this.sleepPeriod);
      }
    }
  }
}
