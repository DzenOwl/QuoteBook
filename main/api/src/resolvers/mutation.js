const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');
const mongoose = require('mongoose');
require('dotenv').config();

const gravatar = require('../util/gravatar');

module.exports = {
  newQuote: async (parent, args, { models, user }) => {
    const defaultQuoteBook = (
      await models.User
        .findById(user.id)
        .lean()
        .exec()
      ).defaultQuoteBook;
    

    const quoteBook = args.quoteBook == undefined ? defaultQuoteBook : args.quoteBook;
    
/*     console.log(`Args quote book: ${args.quoteBook}`)
    console.log(`User quote book: ${defaultQuoteBook}`) */
    
    const quote = await models.Quote.create({
      content: args.content,
      author: mongoose.Types.ObjectId(user.id),
      quoteBook: mongoose.Types.ObjectId(quoteBook),
      favoriteCount: 0
    })
    
    return await models.Quote.findById(quote.id).populate("quoteBook").exec()
  },
  deleteQuote: async (parent, { id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to delete a quote');
    }

    const quote = await models.Quote.findById(id);
    // if the quote owner and current user don't match, throw a forbidden error
    if (quote && String(quote.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to delete the quote");
    }

    try {
      await quote.remove();
      return true;
    } catch (err) {
      return false;
    }
  },
  updateQuote: async (parent, { content, id }, { models, user }) => {
    // if not a user, throw an Authentication Error
    if (!user) {
      throw new AuthenticationError('You must be signed in to update a quote');
    }

    // find the quote
    const quote = await models.Quote.findById(id);
    // if the quote owner and current user don't match, throw a forbidden error
    if (quote && String(quote.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to update the quote");
    }
    
    try {
      // Update the quote in the db and return the updated quote
      return await models.Quote.findOneAndUpdate(
        {
          _id: id
        },
        {
          $set: {
            content
          }
        },
        {
          new: true
        }
      );
      } catch (err) {
        throw new Error('Error updating quote');
      }
  },
  moveQuote: async (parent, { quoteId, newQuoteBookId }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to move a quote');
    }

    const quote = await models.Quote.findById(quoteId);
    // if the quote owner and current user don't match, throw a forbidden error
    if (quote && String(quote.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to delete the quote");
    }

    const quoteBookById = await models.QuoteBook.findById(newQuoteBookId);
    const newQuoteBook = quoteBookById == undefined ? quote.quoteBook : quoteBookById;

    try {
      // Update the quote in the db and return the updated quote
      return await models.Quote.findOneAndUpdate(
        {
          _id: quoteId
        },
        {
          $set: {
            quoteBook: newQuoteBook
          }
        },
        {
          new: true
        }
      );
      } catch (err) {
        throw new Error('Error moving quote');
      }
  },
  toggleFavorite: async (parent, { id }, { models, user }) => {
    // if no user context is passed, throw auth error
    if (!user) {
      throw new AuthenticationError();
    }

    // check to see if the user has already favorited the Quote
    let quoteCheck = await models.Quote.findById(id);
    const hasUser = quoteCheck.favoritedBy.indexOf(user.id);

    // if the user exists in the list
    // pull them from the list and reduce the favoriteCount by 1
    if (hasUser >= 0) {
      return await models.Quote.findByIdAndUpdate(
        id,
        {
          $pull: {
            favoritedBy: mongoose.Types.ObjectId(user.id)
          },
          $inc: {
            favoriteCount: -1
          }
        },
        {
          // Set new to true to return the updated doc
          new: true
        }
      );
    } else {
      // if the user doesn't exists in the list
      // add them to the list and increment the favoriteCount by 1
      return await models.Quote.findByIdAndUpdate(
        id,
        {
          $push: {
            favoritedBy: mongoose.Types.ObjectId(user.id)
          },
          $inc: {
            favoriteCount: 1
          }
        },
        {
          new: true
        }
      );
    }
  },
  newQuoteBook: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to create a quoteBook');
    }

    console.log(args);

    return await models.QuoteBook.create({
      title: args.title,
      comment: args.comment,
      author: mongoose.Types.ObjectId(user.id),
      favoriteCount: 0
    });
  },
  updateQuoteBook: async (parent, { title, comment, id }, { models, user }) => {
    // if not a user, throw an Authentication Error
    if (!user) {
      throw new AuthenticationError('You must be signed in to update a quoteBook');
    }

    // find the quoteBook
    const quoteBook = await models.QuoteBook.findById(id);
    // if the quoteBook owner and current user don't match, throw a forbidden error
    if (quoteBook && String(quoteBook.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to update the quoteBook");
    }

    if (title === "") title = undefined

    const newTitle = title == undefined ? quoteBook.title : title;
    const newComment = comment === undefined ? quoteBook.comment : comment;


    // Update the quoteBook in the db and return the updated quoteBook
    return await models.QuoteBook.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          title: newTitle,
          comment: newComment
        }
      },
      {
        new: true
      }
    );
  },
  deleteQuoteBook: async (parent, { id }, { models, user }) => {
    // if not a user, throw an Authentication Error
    if (!user) {
      throw new AuthenticationError('You must be signed in to delete a quoteBook');
    }
    
    // find the quoteBook
    const quoteBook = await models.QuoteBook.findById(id);
    const defaultId = (await models.QuoteBook.findOne({ author: user.id })).id
    console.log(defaultId)
    
    // if the quoteBook owner and current user don't match, throw a forbidden error
    if (quoteBook && String(quoteBook.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to delete the quoteBook");
    }

    if (quoteBook && defaultId === id) {
      throw new ForbiddenError("You don't have permissions to delete the defaultQuoteBook");
    }

    try {
      await models.Quote.deleteMany({ quoteBook: id })
      // if everything checks out, remove the quoteBook
      await quoteBook.remove();
      return true;
    } catch (err) {
      // if there's an error along the way, return false
      return false;
    }
  },
  toggleFavoriteQuoteBook: async (parent, { id }, { models, user }) => {
    // if no user context is passed, throw auth error
    if (!user) {
      throw new AuthenticationError();
    }

    // check to see if the user has already favorited the QuoteBook
    let quoteBookCheck = await models.QuoteBook.findById(id);
    const hasUser = quoteBookCheck.favoritedBy.indexOf(user.id);

    // if the user exists in the list
    // pull them from the list and reduce the favoriteCount by 1
    if (hasUser >= 0) {
      return await models.QuoteBook.findByIdAndUpdate(
        id,
        {
          $pull: {
            favoritedBy: mongoose.Types.ObjectId(user.id)
          },
          $inc: {
            favoriteCount: -1
          }
        },
        {
          // Set new to true to return the updated doc
          new: true
        }
      );
    } else {
      // if the user doesn't exists in the list
      // add them to the list and increment the favoriteCount by 1
      return await models.QuoteBook.findByIdAndUpdate(
        id,
        {
          $push: {
            favoritedBy: mongoose.Types.ObjectId(user.id)
          },
          $inc: {
            favoriteCount: 1
          }
        },
        {
          new: true
        }
      );
    }
  },
  signUp: async (parent, { username, email, password }, { models, user }) => {
    // normalize email address
    email = email.trim().toLowerCase();
    // hash the password
    const hashed = await bcrypt.hash(password, 10);
    // create the gravatar url
    const avatar = gravatar(email);

    try {
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed
      });

      const defaultQuoteBook = await models.QuoteBook.create({
        title: "Default",
        comment: `Default quote book of ${user.username}`,
        author: mongoose.Types.ObjectId(user._id),
        favoriteCount: 0
      });

      user.defaultQuoteBook = mongoose.Types.ObjectId(defaultQuoteBook._id)
      user.save();

      // create and return the json web token
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      // if there's a problem creating the account, throw an error
      throw new Error('Error creating account');
    }
  },
  signIn: async (parent, { username, email, password }, { models }) => {
    if (email) {
      // normalize email address
      email = email.trim().toLowerCase();
    }

    const user = await models.User.findOne({
      $or: [{ email }, { username }]
    });

    // if no user is found, throw an authentication error
    if (!user) {
      throw new AuthenticationError('Error signing in');
    }

    // if the passwords don't match, throw an authentication error
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AuthenticationError('Error signing in');
    }

    // create and return the json web token
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
};
