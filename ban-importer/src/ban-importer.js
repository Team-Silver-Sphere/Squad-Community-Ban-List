import axios from 'axios';
import mongoose from 'mongoose';

import { BattleMetricsBan, BattleMetricsBanList } from 'database/models';

export default class BanImporter {
  constructor(config) {
    this.apiKey = config.apiKey;
    this.apiRateLimit = config.apiRateLimit;
    this.apiRateLimitReset = config.apiRateLimitReset;

    this.mongoDB = config.mongoDB;

    this.currentBanListID = null;
    this.currentBanListImportID = null;

    this.nextPage = null;
    this.pageSize = 100;

    this.apiAddress = 'https://api.battlemetrics.com/bans';
  }

  async connectToDatabase() {
    await mongoose.connect(this.mongoDB, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
  }

  async run() {
    console.log('Setting up ban importer...');
    await this.connectToDatabase();

    while(true){
      console.log('Selecting ban list to import...');
      await this.selectBanList();

      while (this.nextPage) {
        console.log('Importing ban page...');
        await this.importBanListPage();

        // sleep a little before requesting the next page to avoid getting blocked.
        await this.limitRate();
      }
      console.log('Finished importing bans...');
      await this.updateBanList();
    }
  }

  async selectBanList() {
    const banList = await BattleMetricsBanList.findOne().sort({
      lastImported: 1
    });

    this.currentBanListID = banList.id;
    this.currentBanListImportID = banList.currentImportID + 1;

    this.nextPage =
      this.apiAddress +
      '?' +
      new URLSearchParams({
        'filter[banList]': this.currentBanListID,
        'page[size]': this.pageSize
      });
  }

  async updateBanList() {
    await BattleMetricsBanList.updateOne(
      {
        id: this.currentBanListID
      },
      {
        lastImported: Date.now(),
        currentImportID: this.currentBanListImportID
      }
    );

    await BattleMetricsBan.deleteMany({
      currentImportID: this.currentBanListImportID - 1
    });
  }

  async importBanListPage() {
    console.log(this.nextPage);

    const { data } = await axios.get(this.nextPage, {
      headers: { Authorization: 'Bearer ' + this.apiKey }
    });

    for (const ban of data.data) {
      let steamID;
      // loop through identifiers to get steamID
      for(const identifier of ban.attributes.identifiers){
        if(identifier.type !== 'steamID') continue;

        // some show steam url instead of usual format so handle that case.
        if(identifier.identifier) steamID = identifier.identifier.replace('https://steamcommunity.com/profiles/', '');
        else steamID = identifier.metadata.profile.steamid;
        break;
      }

      // sometimes there is no steamID in the response, so do not add the ban to the DB.
      if(steamID == null) continue;

      await BattleMetricsBan.findOneAndUpdate(
        {
          id: ban.attributes.id,
          uid: ban.attributes.uid,
          importID: this.currentBanListImportID - 1
        },
        {
          id: ban.attributes.id,
          uid: ban.attributes.uid,
          timestamp: ban.attributes.timestamp,
          reason: ban.attributes.reason,
          note: ban.attributes.note,
          expires: ban.attributes.expires,
          steamID: steamID,
          importID: this.currentBanListImportID,
          lastImported: Date.now()
        },
        {
          upsert: true,
          setDefaultsOnInsert: true
        }
      );
    }

    this.nextPage = data.links.next;
  }

  limitRate() {
    return new Promise(resolve =>
      setTimeout(resolve, this.apiRateLimitReset / this.apiRateLimit)
    );
  }
}
