module.exports = {
  // Resolve the author info for a quote when requested
  author: async (quote, args, { models }) => {
    return await models.User.findById(quote.author);
  },
  // Resolved the favoritedBy info for a quote when requested
  favoritedBy: async (quote, args, { models }) => {
    return await models.User.find({ _id: { $in: quote.favoritedBy } });
  }
};
