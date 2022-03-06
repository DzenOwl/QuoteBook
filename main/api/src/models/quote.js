// Require the mongose library
const mongoose = require('mongoose');

// Define the quote's database schema
const quoteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    // reference the author's object ID
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    quoteBook: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuoteBook',
      required: true
    },
    favoriteCount: {
      type: Number,
      default: 0
    },
    favoritedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    // Assigns createdAt and updatedAt fields with a Date type
    timestamps: true
  }
);

// Define the 'Quote' model with the schema
const Quote = mongoose.model('Quote', quoteSchema);
// Export the module
module.exports = Quote;
