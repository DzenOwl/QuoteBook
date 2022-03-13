import { gql } from '@apollo/client';

const NEW_QUOTEBOOK = gql`
  mutation newQuoteBook($title: String!, $comment: String) {
    newQuoteBook(title: $title, comment: $comment) {
      id
      title
      comment
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;

const EDIT_QUOTEBOOK = gql`
  mutation updateQuoteBook($id: ID!, $title: String!, $comment: String) {
    updateQuoteBook(id: $id, title: $title, comment: $comment) {
      id
      title
      comment
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;

const DELETE_QUOTEBOOK = gql`
  mutation deleteQuoteBook($id: ID!) {
    deleteQuoteBook(id: $id)
  }
`;

const TOGGLE_FAVORITE = gql`
  mutation toggleFavoriteQuoteBook($id: ID!) {
    toggleFavoriteQuoteBook(id: $id) {
      id
      favoriteCount
    }
  }
`;

const NEW_QUOTE = gql`
  mutation newQuoteBook($content: String!, $quoteBook: ID) {
    newQuoteBook(content: $content, quoteBook: $quoteBook) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
      quoteBook {
        id
        title
      }
    }
  }
`;

const EDIT_QUOTE = gql`
  mutation updateQuote($id: ID!, $content: String) {
    updateQuote(id: $id, content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
      quoteBook {
        id
        title
      }
    }
  }
`;

const DELETE_QUOTE = gql`
  mutation deleteQuote($id: ID!) {
    deleteQuote(id: $id)
  }
`;

const TOGGLE_FAVORITE_QUOTE = gql`
  mutation toggleFavorite($id: ID!) {
    toggleFavorite(id: $id) {
      id
      favoriteCount
    }
  }
`;

const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

export {
  NEW_QUOTEBOOK,
  EDIT_QUOTEBOOK,
  DELETE_QUOTEBOOK,
  TOGGLE_FAVORITE,
  NEW_QUOTE,
  EDIT_QUOTE,
  DELETE_QUOTE,
  TOGGLE_FAVORITE_QUOTE,
  SIGNIN_USER,
  SIGNUP_USER
};
