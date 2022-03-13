import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_QUOTEBOOK_QUOTES } from '../gql/query';
import QuoteFeed from '../components/quote/QuoteFeed';

import { APP_NAME } from '../App';

const QuotesInQuoteBook = props => {
  useEffect(() => {
    // update the document title
    document.title = `My Qoute Books — ${APP_NAME}`;
  });

  // store the id found in the url as a variable
  const id = props.match.params.id;

  const { loading, error, data } = useQuery(GET_QUOTEBOOK_QUOTES, { variables: { id } });
  // if the data is loading, our app will display a loading message
  if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  if (error) return `Error! ${error.message}`;
  // if the query is successful and there are quoteBooks, return the feed of quoteBooks
  // else if the query is successful and there aren't quoteBooks, display a message
  if (data.quoteBook.quotes.length !== 0) {
    return <QuoteFeed quotes={data.quoteBook.quotes} />;
  } else {
    return <p>No quotes yet</p>;
  }
};

export default QuotesInQuoteBook;
