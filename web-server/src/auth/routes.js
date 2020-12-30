import Router from 'koa-router';
import jwt from 'jsonwebtoken';

import { JWT_AUTH } from 'scbl-lib/config';

import passport from './passport.js';

const router = new Router();

router.get('/steam', passport.authenticate('steam'));

router.get('/steam/return', passport.authenticate('steam', { session: false }), (ctx) => {
  ctx.body = JSON.stringify({
    token: jwt.sign({ user: ctx.req.user }, JWT_AUTH.SECRET)
  });
});

export default router;
