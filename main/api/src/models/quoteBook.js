// Require the mongose library
const mongoose = require('mongoose');

// Define the QuoteBook's database schema
const quoteBookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    comment: {
      type: String,
    },
    // reference the author's object ID
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

const QuoteBook = mongoose.model('QuoteBook', quoteBookSchema);
module.exports = QuoteBook;
