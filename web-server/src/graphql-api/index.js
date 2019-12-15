import ApolloServerKoa from 'apollo-server-koa';

import typeDefs from './typedefs.js';
import resolvers from './resolvers.js';
const { ApolloServer, makeExecutableSchema } = ApolloServerKoa;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default new ApolloServer({
  schema
});
