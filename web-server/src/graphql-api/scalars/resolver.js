import graphql from 'graphql';
const { GraphQLScalarType } = graphql;

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return new Date(value).getTime(); // value sent to the client
    }
  })
};
