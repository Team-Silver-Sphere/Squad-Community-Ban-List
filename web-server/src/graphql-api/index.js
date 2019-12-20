import ApolloServerKoa from 'apollo-server-koa';
import jwt from 'jsonwebtoken';

import { jwtAuth } from 'core/config/secrets';

import typeDefs from './typedefs.js';
import resolvers from './resolvers.js';
const { ApolloServer, makeExecutableSchema } = ApolloServerKoa;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default new ApolloServer({
  schema,
  context: async ({ ctx }) => {
    try {
      const user = jwt.verify(ctx.get('JWT'), jwtAuth.secret, {
        algorithms: [jwtAuth.algorithm]
      }).user.steamID;

      return { user };
    } catch (err) {
      return { user: null };
    }
  }
});
