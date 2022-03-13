import { gql } from '@apollo/client';

const GET_QUOTEBOOKS = gql`
  query quoteBookFeed($cursor: String) {
    quoteBookFeed(cursor: $cursor) {
      cursor
      hasNextPage
      quoteBooks {
        id
        createdAt
        title
        comment
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

const GET_QUOTEBOOK = gql`
  query quoteBook($id: ID!) {
    quoteBook(id: $id) {
      id
      title
      createdAt
      comment
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`;

const GET_MY_QUOTEBOOKS = gql`
  query me {
    me {
      id
      username
      quoteBooks {
        id
        title
        createdAt
        comment
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

const GET_MY_FAVORITE_QUOTEBOOKS = gql`
  query me {
    me {
      id
      username
      favoriteQuoteBooks {
        id
        title
        createdAt
        comment
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

const GET_ME = gql`
  query me {
    me {
      id
      favorites {
        id
      }
      favoriteQuoteBooks {
        id
      }
    }
  }
`;

const GET_QUOTES = gql`
  query quoteFeed($cursor: String) {
    quoteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      quotes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
        quoteBook {
          id
          title
        }
      }
    }
  }
`;

const GET_QUOTE = gql`
  query quote($id: ID!) {
    quote(id: $id) {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
      quoteBook {
        id
        title
      }
    }
  }
`;

const GET_QUOTEBOOK_QUOTES = gql`
  query quoteBook($id: ID!) {
    quoteBook(id: $id) {
      id
      title
      createdAt
      favoriteCount
      quotes {
        id
        content
        createdAt
        favoriteCount
        author {
          username
          id
          avatar
        }
        quoteBook {
          id
        }
      }
    }
  }
`;

const GET_MY_FAVORITES = gql`
  query me {
    me {
      id
      username
      favorites {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

export {
  GET_QUOTEBOOKS,
  GET_QUOTEBOOK,
  GET_MY_QUOTEBOOKS,
  GET_MY_FAVORITE_QUOTEBOOKS,
  GET_QUOTES,
  GET_QUOTE,
  GET_QUOTEBOOK_QUOTES,
  GET_MY_FAVORITES,
  GET_ME,
  IS_LOGGED_IN
};
