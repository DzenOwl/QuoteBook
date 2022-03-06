module.exports = {
  quotes: async (parent, args, { models }) => {
    return await models.Quote.find();
  },
  quote: async (parent, args, { models }) => {
    return await models.Quote.findById(args.id);
  },
  users: async (parent, args, { models }) => {
    return await models.User.find();
  },
  user: async (parent, args, { models }) => {
    return await models.User.findOne({ username: args.username });
  },
  me: async (parent, args, { models, user }) => {
    return await models.User.findById(user.id);
  },
  quoteBooks: async (parent, args, { models }) => {
    return await models.QuoteBook.find();
  },
  quoteBook: async (parent, args, { models }) => {
    return await models.QuoteBook.findOne({ title: args.title });
  },
};
