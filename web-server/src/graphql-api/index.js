import ApolloServerKoa from 'apollo-server-koa';
const { ApolloServer, makeExecutableSchema } = ApolloServerKoa;

import typeDefs from './typedefs.js';
import resolvers from './resolvers.js';

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default new ApolloServer({
  schema
});
