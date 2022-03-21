import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import QuoteForm from '../../components/quote/QuoteForm';
import { NEW_QUOTE } from '../../gql/mutation'; 
import { GET_QUOTEBOOK_QUOTES } from '../../gql/query';

import { APP_NAME } from '../../App';

const NewQuote = props => {
  useEffect(() => {
    // update the document title
    document.title = `New Quote — ${APP_NAME}`;
  });

  const quoteBook = props.match.params.id;

  const [data, { loading, error }] = useMutation(NEW_QUOTE, {
    variables: { quoteBook },
    // refetch the GET_QUOTEBOOK_QUOTES queries to update the cache
    refetchQueries: [{ query: GET_QUOTEBOOK_QUOTES, variables: { id: quoteBook } }],
    onCompleted: data => {
      // when complete, redirect the user to the quote page
      props.history.push(`/quotebook/${quoteBook}/quotes`);
    }
  });

  return (
    <React.Fragment>
      {/* as the mutation is loading, display a loading message*/}
      {loading && <p>Loading...</p>}
      {/* if there is an error, display a error message*/}
      {error && <p>Error saving the quote</p>}
      {/* the form component, passing the mutation data as a prop */}
      <QuoteForm action={data} />
    </React.Fragment>
  );
};

export default NewQuote;
