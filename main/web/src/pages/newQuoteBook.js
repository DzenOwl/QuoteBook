import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import QuoteBookForm from '../components/quoteBook/QuoteBookForm';
import { NEW_QUOTEBOOK } from '../gql/mutation'; 
import { GET_MY_QUOTEBOOKS, GET_QUOTEBOOKS } from '../gql/query';

const NewQuoteBook = props => {
  useEffect(() => {
    // update the document title
    document.title = 'New Quote Book — Notedly';
  });

  const [data, { loading, error }] = useMutation(NEW_QUOTEBOOK, {
    // refetch the GET_QUOTEBOOKS and GET_MY_QUOTEBOOKS queries to update the cache
    refetchQueries: [{ query: GET_MY_QUOTEBOOKS }, { query: GET_QUOTEBOOKS }],
    onCompleted: data => {
      // when complete, redirect the user to the quoteBook page
      props.history.push(`quotebook/${data.newQuoteBook.id}`);
    }
  });

  return (
    <React.Fragment>
      {/* as the mutation is loading, display a loading message*/}
      {loading && <p>Loading...</p>}
      {/* if there is an error, display a error message*/}
      {error && <p>Error saving the quote  book</p>}
      {/* the form component, passing the mutation data as a prop */}
      <QuoteBookForm action={data} />
    </React.Fragment>
  );
};

export default NewQuoteBook;
