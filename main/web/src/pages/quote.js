import React from 'react';
// import our GraphQL dependencies
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom'

// import the Quote component
import Quote from '../components/quote/Quote';
import { GET_QUOTE } from '../gql/query';

const QuotePage = props => {
  // store the id found in the url as a variable
  //const id = props.match.params.id;
  const { quoteBookId, quoteId } = useParams();

  // query hook, passing the id value as a variable
  const { loading, error, data } = useQuery(GET_QUOTE, { variables: { id: quoteId } });

  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error! Quote not found</p>;

  // if the data is successful, display the data in our UI
  return <Quote quote={data.quote} />;
};

export default QuotePage;