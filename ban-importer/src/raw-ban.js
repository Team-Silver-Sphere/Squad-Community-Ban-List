import { Ban, SteamUser } from 'scbl-lib/db/models';
import { classifyBanReason, Logger } from 'scbl-lib/utils';

export default class RawBan {
  constructor(banList, data) {
    this.banList = banList;

    this.id = data.id;

    this.steamUser = data.steamUser;

    this.created = data.created || Date.now();
    this.expires = data.expires;
    this.expired = data.expired;

    this.reason = classifyBanReason(data.reason);
    this.rawReason = data.reason;
  }

  async save() {
    // Create the Steam if not already created.
    Logger.verbose(
      'RawBan',
      1,
      `Creating Steam user (ID: ${this.steamUser}) for raw ban (ID: ${this.id}) in ban list (ID: ${this.banList.id})...`
    );
    await SteamUser.create({ id: this.steamUser }, { updateOnDuplicate: ['id'] });

    // Create or find the ban.
    Logger.verbose(
      'RawBan',
      1,
      `Creating or updating ban for raw ban (ID: ${this.id}) in ban list (ID: ${this.banList.id})...`
    );
    const [ban, created] = await Ban.findOrCreate({
      where: {
        id: this.id
      },
      defaults: {
        id: this.id,
        created: this.created || Date.now(),
        expires: this.expires,
        expired: this.expired,
        reason: this.reason,
        rawReason: this.rawReason,
        steamUser: this.steamUser,
        banList: this.banList.id
      }
    });

    // Queue the Steam user for an update if the ban is new or the ban expired status has changed.
    if (created || ban.expired !== this.expired) {
      Logger.verbose(
        'RawBan',
        1,
        `Queuing Steam user (ID: ${this.steamUser}) for update for raw ban (ID: ${this.id}) in ban list (ID: ${this.banList.id})...`
      );
      await SteamUser.update(
        {
          lastRefreshedExport: null,
          lastRefreshedReputationPoints: null,
          lastRefreshedReputationRank: null
        },
        {
          where: { id: this.steamUser }
        }
      );
    }

    // If it's created there's no need to update the information.
    if (created) return;

    // Update the information.
    ban.expires = this.expires;
    ban.expired = this.expired;
    ban.reason = this.reason;
    ban.rawReason = this.rawReason;

    // Save the updated information.
    await ban.save();
  }
}
