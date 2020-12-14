import graphql from 'graphql';
import ApolloServerKoa from 'apollo-server-koa';

const { defaultFieldResolver } = graphql;
const { SchemaDirectiveVisitor } = ApolloServerKoa;

class SystemAdminOnly extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (parent, args, context, info) {
      if (context.isSystemAdmin) return resolve.apply(this, [parent, args, context, info]);
      return null;
    };
  }
}

export default SystemAdminOnly;
