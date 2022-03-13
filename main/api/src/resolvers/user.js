module.exports = {
  // Resolve the list of notes for a user when requested
  quotes: async (user, args, { models }) => {
    return await models.Quote.find({ author: user._id }).sort({ _id: -1 });
  },
  // Resolve the list of favorites for a user when requested
  favorites: async (user, args, { models }) => {
    return await models.Quote.find({ favoritedBy: user._id }).sort({ _id: -1 });
  },
  favoriteQuoteBooks: async (user, args, { models }) => {
    return await models.QuoteBook.find({ favoritedBy: user._id }).sort({ _id: -1 });
  },
  quoteBooks: async (user, args, { models }) => {
    return await models.QuoteBook.find({ author: user._id }).sort({ _id: -1 });
  },
  defaultQuoteBook: async (user, args, { models }) => {
    return await models.QuoteBook.findById( user.defaultQuoteBook ).exec();
  },
};
