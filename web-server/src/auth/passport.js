import passport from 'koa-passport';
import SteamStrategy from 'passport-steam';

import { HOST, STEAM_API_KEY } from 'scbl-lib/config';
import { SteamUser } from 'scbl-lib/db/models';

passport.use(
  new SteamStrategy(
    {
      returnURL: HOST + '/login',
      realm: HOST,
      apiKey: STEAM_API_KEY
    },
    async (_, profile, done) => {
      const steamUsers = await SteamUser.bulkCreate(
        [
          {
            id: profile.id,
            name: profile.displayName,
            avatar: profile.photos[0].value,
            avatarMedium: profile.photos[1].value,
            avatarFull: profile.photos[2].value,
            isSCBLUser: true
          }
        ],
        { updateOnDuplicate: ['isSCBLUser'] }
      );

      return done(null, steamUsers[0]);
    }
  )
);

export default passport;
