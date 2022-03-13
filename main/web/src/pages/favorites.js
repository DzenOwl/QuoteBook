import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';

import QuoteBookFeed from '../components/quoteBook/QuoteBookFeed';
import { GET_MY_FAVORITES } from '../gql/query';

import { APP_NAME } from '../App';

const Favorites = () => {
  useEffect(() => {
    // update the document title
    document.title = `Favorites — ${APP_NAME}`;
  });

  const { loading, error, data } = useQuery(GET_MY_FAVORITES);
  console.log(data)

  // if the data is loading, our app will display a loading message
  if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  if (error) return `Error! ${error.message}`;
  // if the query is successful and there are notes, return the feed of notes
  // else if the query is successful and there aren't notes, display a message
  if (data.me.favoriteQuoteBooks.length !== 0) {
    return <QuoteBookFeed quoteBooks={data.me.favoriteQuoteBooks} />;
  } else {
    return <p>No favorites yet</p>;
  }
};

export default Favorites;
