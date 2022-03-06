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
    favorites: [Quote!]!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    quoteBooks: [Quote!]!
    quotes: [Quote!]!
    favorites: [Quote!]!
    defaultQuoteBook: QuoteBook!
  }

  type Query {
    quotes: [Quote!]!
    quote(id: ID): Quote!
    user(username: String!): User
    users: [User!]!
    me: User!
    quoteBooks: [QuoteBook!]!
    quoteBook(id: ID, title: String): QuoteBook!
  }

  type Mutation {
    newQuote(content: String!, quoteBook: ID): Quote
    updateQuote(id: ID!, content: String!): Quote!
    deleteQuote(id: ID!): Boolean!

    newQuoteBook(title: String!, comment: String): QuoteBook
    updateQuoteBook(id: ID!, comment: String!): Quote!
    deleteQuoteBook(id: ID!): Boolean!

    toggleFavorite(id: ID!): Quote!
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
  }
`;