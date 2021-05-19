import Koa from 'koa';
import Router from '@koa/router';
import Helmet from 'koa-helmet';
import Cors from '@koa/cors';
import Logger from 'koa-logger';

import passport from 'koa-passport';
import SteamStrategy from 'passport-steam';
import jwt from 'jsonwebtoken';

import next from 'next';

import { HOST, JWT_AUTH, STEAM_API_KEY } from 'scbl-lib/config';
import { ExportBan, SteamUser } from 'scbl-lib/db/models';

import bindGraphQLAPI from './graphql-api/index.js';

// Setup Koa app.
const server = new Koa();
server.use(Helmet());
server.use(Cors());
server.use(Logger());

const router = new Router();

// Setup Auth.
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

server.use(passport.initialize());

router.get('/auth/steam', passport.authenticate('steam'));

router.get('/auth/steam/return', passport.authenticate('steam', { session: false }), (ctx) => {
  ctx.body = JSON.stringify({
    token: jwt.sign({ user: ctx.req.user }, JWT_AUTH.SECRET)
  });
});

// Setup GraphQL API.
bindGraphQLAPI(server);

// Setup remote export ban lists.
router.get('/export/:id', async (ctx) => {
  ctx.body = (
    await ExportBan.findAll({
      where: {
        exportBanList: ctx.params.id
      }
    })
  )
    .map((exportBan) => `${exportBan.steamUser}:0`)
    .join('\n');
});

// Setup Next client.
const client = next({ dir: './client', dev: process.env.NODE_ENV !== 'production' });
const clientHandler = client.getRequestHandler();

router.all('(.*)', async (ctx) => {
  await clientHandler(ctx.req, ctx.res);
});

// Apply routes to Koa app.
server.use(router.routes());
server.use(router.allowedMethods());

export { server, client };
