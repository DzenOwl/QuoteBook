import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client';

import { GET_QUOTEBOOK_QUOTES } from '../../gql/query';
import QuoteFeed from '../../components/quote/QuoteFeed';
import Button from '../../components/Button';

import { APP_NAME } from '../../App';
import { Link } from 'react-router-dom';

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
    return (
      <React.Fragment>
        <QuoteFeed quotes={data.quoteBook.quotes} />
        <Button
          onClick={()=> {
            props.history.push(`/quoteBook/${data.quoteBook.id}/newquote`);
          }}
        >
          +
        </Button>
        
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>No quotes yet</p>
        <Button
          onClick={()=> {
            props.history.push(`/quoteBook/${data.quoteBook.id}/newquote`);
            return {
              quoteBook: data.quoteBook,
              __typename: 'quoteBook'
            }
          }}
        >
          +
        </Button>
      </React.Fragment>
    )
  }
};

export default QuotesInQuoteBook;
