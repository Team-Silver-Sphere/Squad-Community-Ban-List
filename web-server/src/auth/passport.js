import passport from 'koa-passport';
import SteamStrategy from 'passport-steam';

import { host } from 'core/config/web-server';
import { steamAPIKey } from 'core/config/secrets';

import { SteamUser } from 'database/models';

passport.use(
  new SteamStrategy(
    {
      returnURL: host + '/login',
      realm: host,
      apiKey: steamAPIKey
    },
    async (_, rawProfile, done) => {
      const query = {
        steamID: rawProfile.id,
        displayName: rawProfile.displayName,
        avatar: rawProfile.photos[0].value,
        avatarMedium: rawProfile.photos[1].value,
        avatarFull: rawProfile.photos[2].value,
        $setOnInsert: { systemAdmin: (await SteamUser.countDocuments()) === 0 }
      };

      const user = await SteamUser.findOneAndUpdate(
        {
          steamID: query.steamID
        },
        query,
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true
        }
      );

      return done(null, user);
    }
  )
);

export default passport;
