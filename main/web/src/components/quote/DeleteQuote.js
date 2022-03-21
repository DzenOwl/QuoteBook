import React from 'react';
import { useMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';

import ButtonAsLink from '../ButtonAsLink';
import { DELETE_QUOTE } from '../../gql/mutation';
import { GET_QUOTEBOOK_QUOTES } from '../../gql/query';

const DeleteQuote = props => {

  const quoteBook = props.match.params.id;

  const [deleteQuote] = useMutation(DELETE_QUOTE, {
    variables: {
      id: props.quoteId
    },
    // refetch the quotes list queries to update the cache
    refetchQueries: [{ query: GET_QUOTEBOOK_QUOTES, variables: { id: quoteBook } }],
    onCompleted: data => {
      // redirect the user to the "my quotes" page
      props.history.push(`/quotebook/${quoteBook}/quotes`);

    }
  });

  return <ButtonAsLink onClick={deleteQuote}>Delete Quote</ButtonAsLink>;
};

export default withRouter(DeleteQuote);
