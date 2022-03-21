import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';

import QuoteFeed from '../../components/quote/QuoteFeed';
import { GET_MY_FAVORITE_QUOTES } from '../../gql/query';

import { APP_NAME } from '../../App';

const FavoriteQuotes = () => {
  useEffect(() => {
    // update the document title
    document.title = `Favorite Quotes — ${APP_NAME}`;
  });

  const { loading, error, data } = useQuery(GET_MY_FAVORITE_QUOTES);

  // if the data is loading, our app will display a loading message
  if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  if (error) return `Error! ${error.message}`;
  // if the query is successful and there are notes, return the feed of notes
  // else if the query is successful and there aren't notes, display a message
  if (data.me.favoriteQuotes.length !== 0) {
    return <QuoteFeed quotes={data.me.favoriteQuotes} />;
  } else {
    return <p>No favorites yet</p>;
  }
};

export default FavoriteQuotes;
