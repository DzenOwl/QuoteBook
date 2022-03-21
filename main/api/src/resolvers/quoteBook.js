module.exports = {
  // Resolve the list of Quotess for a user when requested
  quotes: async (quoteBook, args, { models }) => {
    return await models.Quote.find({ quoteBook: quoteBook._id }).sort({ _id: -1 });
  },
  // Resolve the list of favorites for a user when requested
  favoriteQuotes: async (quoteBook, args, { models }) => {
    return await models.Quote.find({ favoritedBy: quoteBook._id }).sort({ _id: -1 });
  },
  author: async (quoteBook, args, { models }) => {
    return await models.User.findById(quoteBook.author);
  },
  // Resolved the favoritedBy info for a quoteBook when requested
  favoritedBy: async (quoteBook, args, { models }) => {
    return await models.User.find({ _id: { $in: quoteBook.favoritedBy } });
  }
};