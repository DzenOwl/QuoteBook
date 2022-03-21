const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime

  type Quote {
    id: ID!
    content: String!
    author: User!
    quoteBook: QuoteBook!
    favoriteCount: Int!
    favoritedBy: [User!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type QuoteBook {
    id: ID!
    title: String!
    comment: String
    author: User!
    createdAt: DateTime!
    updatedAt: DateTime!
    quotes: [Quote!]!
    favoriteCount: Int!
    favoritedBy: [User!]
    favoriteQuotes: [Quote!]!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    quoteBooks: [QuoteBook!]!
    quotes: [Quote!]!
    favoriteQuotes: [Quote!]!
    favoriteQuoteBooks: [QuoteBook!]!
    defaultQuoteBook: QuoteBook!
  }

  type QuoteFeed {
    quotes: [Quote]!
    cursor: String!
    hasNextPage: Boolean!
  }

  type QuoteBookFeed {
    quoteBooks: [QuoteBook]!
    cursor: String!
    hasNextPage: Boolean!
  }

  type Query {
    quotes: [Quote!]!
    quote(id: ID): Quote!
    user(username: String!): User
    users: [User!]!
    me: User!
    quoteBooks: [QuoteBook!]!
    quoteBook(id: ID, title: String): QuoteBook!
    quoteFeed(cursor: String): QuoteFeed
    quoteBookFeed(cursor: String): QuoteBookFeed
  }

  type Mutation {
    newQuote(content: String!, quoteBook: ID): Quote
    updateQuote(id: ID!, content: String!): Quote!
    deleteQuote(id: ID!): Boolean!
    moveQuote(quoteId: ID!, newQuoteBookId: ID!): Quote!

    newQuoteBook(title: String!, comment: String): QuoteBook
    updateQuoteBook(id: ID!, title: String!, comment: String): QuoteBook!
    deleteQuoteBook(id: ID!): Boolean!

    toggleFavorite(id: ID!): Quote!
    toggleFavoriteQuoteBook(id: ID!):QuoteBook!
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
  }
`;