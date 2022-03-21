import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import QuoteBookFeed from '../../components/quoteBook/QuoteBookFeed';
import { GET_MY_QUOTEBOOKS } from '../../gql/query';

import { APP_NAME } from '../../App';

const MyQouteBooks = () => {
  useEffect(() => {
    // update the document title
    document.title = `My Qoute Books — ${APP_NAME}`;
  });

  const { loading, error, data } = useQuery(GET_MY_QUOTEBOOKS);

  // if the data is loading, our app will display a loading message
  if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  if (error) return `Error! ${error.message}`;
  // if the query is successful and there are quoteBooks, return the feed of quoteBooks
  // else if the query is successful and there aren't quoteBooks, display a message
  if (data.me.quoteBooks.length !== 0) {
    return <QuoteBookFeed quoteBooks={data.me.quoteBooks} />;
  } else {
    return <p>No quote books yet</p>;
  }
};

export default MyQouteBooks;
