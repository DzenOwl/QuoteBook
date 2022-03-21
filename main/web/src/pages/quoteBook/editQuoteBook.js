import React from 'react';
import { useMutation, useQuery } from '@apollo/client';

// import the quoteBookForm component
import QuoteBookForm from '../../components/quoteBook/QuoteBookForm';
import { GET_QUOTEBOOK, GET_ME } from '../../gql/query';
import { EDIT_QUOTEBOOK } from '../../gql/mutation';

const EditQuoteBook = props => {
  // store the id found in the url as a variable
  const id = props.match.params.id;
  // define our quoteBook query
  const { loading, error, data } = useQuery(GET_QUOTEBOOK, { variables: { id } });
  // fetch the current user's data
  const { data: userdata } = useQuery(GET_ME);
  // define our mutation
  const [editQuoteBook] = useMutation(EDIT_QUOTEBOOK, {
    variables: {
      id
    },
    onCompleted: () => {
      props.history.push(`/quotebook/${id}`);
    }
  });

  // if the data is loading, display a loading message
  if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;
  // if the current user and the author of the quoteBook do not match
  if (userdata.me.id !== data.quoteBook.author.id) {
    return <p>You do not have access to edit this quote book</p>;
  }

  // pass the data and mutation to the form component
  return <QuoteBookForm 
    title={data.quoteBook.title} 
    comment={data.quoteBook.comment} 
    action={editQuoteBook} 
  />;
};

export default EditQuoteBook;
