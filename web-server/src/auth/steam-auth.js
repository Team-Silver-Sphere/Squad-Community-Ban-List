import Router from 'koa-router';
import jwt from 'jsonwebtoken';

import { jwtAuth } from 'core/config/secrets';

import passport from './passport.js';

const router = new Router();

router.get('/steam', passport.authenticate('steam'));

router.get(
  '/steam/return',
  passport.authenticate('steam', {
    session: false,
    failureFlash: 'Failed to login.'
  }),
  ctx => {
    ctx.body = JSON.stringify({
      token: jwt.sign({ user: ctx.req.user }, jwtAuth.secret)
    });
  }
);

export default router;
