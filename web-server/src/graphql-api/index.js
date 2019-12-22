import ApolloServerKoa from 'apollo-server-koa';
import jwt from 'jsonwebtoken';

import { jwtAuth } from 'core/config/secrets';

import typeDefs from './typedefs.js';
import resolvers from './resolvers.js';
import { directives as schemaDirectives } from './directives/index.js';

const { ApolloServer, makeExecutableSchema } = ApolloServerKoa;

const schema = makeExecutableSchema({ typeDefs, resolvers, schemaDirectives });

export default new ApolloServer({
  schema,
  context: async ({ ctx }) => {
    try {
      const userClaim = jwt.verify(ctx.get('JWT'), jwtAuth.secret, {
        algorithms: [jwtAuth.algorithm]
      }).user;

      const user = userClaim.steamID;
      const isSystemAdmin = userClaim.systemAdmin;

      return { user, isSystemAdmin };
    } catch (err) {
      return { user: null, isSystemAdmin: false };
    }
  }
});
