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
    return await models.QuoteBook.findById(args.id);
  },
  quoteFeed: async (parent, { cursor }, { models }) => {
    // hard code the limit to 10 items
    const limit = 10;
    // set the default hasNextPage value to false
    let hasNextPage = false;
    // if no cursor is passed the default query will be empty
    // this will pull the newest notes from the db
    let cursorQuery = {};

    // if there is a cursor
    // our query will look for notes with an ObjectId less than that of the cursor
    if (cursor) {
      cursorQuery = { _id: { $lt: cursor } };
    }

    // find the limit + 1 of notes in our db, sorted newest to oldest
    let quotes = await models.Quote.find(cursorQuery)
      .sort({ _id: -1 })
      .limit(limit + 1);

    // if the number of notes we find exceeds our limit
    // set hasNextPage to true & trim the notes to the limit
    if (quotes.length > limit) {
      hasNextPage = true;
      quotes = quotes.slice(0, -1);
    }

    // the new cursor will be the Mongo ObjectID of the last item in the feed array
    const newCursor = quotes[quotes.length - 1]._id;

    return {
      quotes,
      cursor: newCursor,
      hasNextPage
    };
  },
  quoteBookFeed: async (parent, { cursor }, { models }) => {
    // hard code the limit to 10 items
    const limit = 10;
    // set the default hasNextPage value to false
    let hasNextPage = false;
    // if no cursor is passed the default query will be empty
    // this will pull the newest notes from the db
    let cursorQuery = {};

    // if there is a cursor
    // our query will look for notes with an ObjectId less than that of the cursor
    if (cursor) {
      cursorQuery = { _id: { $lt: cursor } };
    }

    // find the limit + 1 of notes in our db, sorted newest to oldest
    let quoteBooks = await models.QuoteBook.find(cursorQuery)
      .sort({ _id: -1 })
      .limit(limit + 1);

    // if the number of notes we find exceeds our limit
    // set hasNextPage to true & trim the notes to the limit
    if (quoteBooks.length > limit) {
      hasNextPage = true;
      quoteBooks = quoteBooks.slice(0, -1);
    }

    // the new cursor will be the Mongo ObjectID of the last item in the feed array
    const newCursor = quoteBooks[quoteBooks.length - 1]._id;

    return {
      quoteBooks,
      cursor: newCursor,
      hasNextPage
    };
  }
};
