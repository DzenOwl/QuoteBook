import React from 'react';
import { useMutation, useQuery } from '@apollo/client';

// import the quoteForm component
import QuoteForm from '../components/quote/QuoteForm';
import { GET_QUOTE, GET_ME } from '../gql/query';
import { EDIT_QUOTE } from '../gql/mutation';

const EditQuote = props => {
  // store the id found in the url as a variable
  const id = props.match.params.id;
  // define our quote query
  const { loading, error, data } = useQuery(GET_QUOTE, { variables: { id } });
  // fetch the current user's data
  const { data: userdata } = useQuery(GET_ME);
  // define our mutation
  const [editQuote] = useMutation(EDIT_QUOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      props.history.push(`/quote/${id}`);
    }
  });

  // if the data is loading, display a loading message
  if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;
  // if the current user and the author of the quote do not match
  if (userdata.me.id !== data.quote.author.id) {
    return <p>You do not have access to edit this quote book</p>;
  }

  // pass the data and mutation to the form component
  return <QuoteForm 
    content={data.quote.content} 
    action={editQuote} 
  />;
};

export default EditQuote;
