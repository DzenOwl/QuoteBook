import React, { useEffect } from 'react';
// import our GraphQL dependencies
import { useQuery, gql } from '@apollo/client';

// import the QuoteBook component
import QuoteBook from '../components/quoteBook/QuoteBook';
import { GET_QUOTEBOOK } from '../gql/query';
import { APP_NAME } from '../App';

const QuoteBookPage = props => {
  useEffect(() => {
    // update the document title
    document.title = `Qoute Book — ${APP_NAME}`;
  });

  // store the id found in the url as a variable
  const id = props.match.params.id;

  // query hook, passing the id value as a variable
  const { loading, error, data } = useQuery(GET_QUOTEBOOK, { variables: { id } });

  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error! Quote book not found</p>;

  // if the data is successful, display the data in our UI
  return <QuoteBook quoteBook={data.quoteBook} />;
};

export default QuoteBookPage;
