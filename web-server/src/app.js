import Koa from 'koa';
import Router from 'koa-router';
import Helmet from 'koa-helmet';
import Cors from '@koa/cors';
import BodyParser from 'koa-bodyparser';
import Logger from 'koa-logger';

import connectToDB from 'database/utils/connect';

import ApolloServer from './graphql-api/index.js';

const inProduction = process.env.NODE_ENV;

connectToDB();

const app = new Koa();
const router = new Router();

app.use(Helmet());
app.use(Cors());
app.use(
  BodyParser({
    enableTypes: ['json'],
    jsonLimit: '5mb',
    strict: true,
    onerror: function(err, ctx) {
      if (err) console.log(err);
      ctx.throw('body parse error', 422);
    }
  })
);

if (!inProduction) app.use(Logger());

ApolloServer.applyMiddleware({ app });

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
