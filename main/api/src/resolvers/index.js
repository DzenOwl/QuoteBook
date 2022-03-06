const Query = require('./query');
const Mutation = require('./mutation');
const Quote = require('./quote');
const User = require('./user');
const QuoteBook = require('./quoteBook');
const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = {
  Query,
  Mutation,
  Quote,
  User,
  QuoteBook,
  DateTime: GraphQLDateTime
};
