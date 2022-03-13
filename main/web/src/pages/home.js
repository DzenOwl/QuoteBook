import React from 'react';
import { useQuery, gql } from '@apollo/client';

import QuoteBookFeed from '../components/quoteBook/QuoteBookFeed';
import Button from '../components/Button';

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

const Home = () => {
  // query hook
  const { data, loading, error, fetchMore } = useQuery(GET_QUOTEBOOKS);

  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;

  // if the data is successful, display the data in our UI
  return (
    <React.Fragment>
      <QuoteBookFeed quoteBooks={data.quoteBookFeed.quoteBooks} />
      {data.quoteBookFeed.hasNextPage && (
        <Button
          onClick={() =>
            fetchMore({
              variables: {
                cursor: data.quoteBookFeed.cursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  quoteBookFeed: {
                    cursor: fetchMoreResult.quoteBookFeed.cursor,
                    hasNextPage: fetchMoreResult.quoteBookFeed.hasNextPage,
                    // combine the new results and the old
                    quoteBooks: [
                      ...previousResult.quoteBookFeed.quoteBooks,
                      ...fetchMoreResult.quoteBookFeed.quoteBooks
                    ],
                    __typename: 'quoteBookFeed'
                  }
                };
              }
            })
          }
        >
          Load more
        </Button>
      )}
    </React.Fragment>
  );
};

export default Home;
