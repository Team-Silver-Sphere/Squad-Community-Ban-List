import sleep from 'core/utils/sleep';

import BanListCreator from './ban-list-creator.js';
import BanImporter from './ban-importer.js';

export default class Gateway {
  constructor() {
    this.banListCreator = new BanListCreator();
    this.banImporter = new BanImporter();

    this.sleepPeriod = 10 * 1000;
  }

  async run() {
    while (true) {
      if (await this.banListCreator.hasWork()) {
        await this.banListCreator.doWork();
      } else if (await this.banImporter.hasWork()) {
        await this.banImporter.doWork();
      } else {
        console.log('No work found. Sleeping...');
        await sleep(this.sleepPeriod);
      }
    }
  }
}
