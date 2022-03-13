/* import React from 'react';
import { useMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';

import ButtonAsLink from '../ButtonAsLink';
import { DELETE_QUOTE } from '../../gql/mutation';
import { GET_MY_QUOTES, GET_QUOTES } from '../../gql/query';

const DeleteQuote = props => {
  const [deleteQuote] = useMutation(DELETE_QUOTE, {
    variables: {
      id: props.quoteId
    },
    // refetch the quotes list queries to update the cache
    refetchQueries: [{ query: GET_MY_QUOTES, GET_QUOTES }],
    onCompleted: data => {
      // redirect the user to the "my quotes" page
      props.history.push('/myquotes');
    }
  });

  return <ButtonAsLink onClick={deleteQuote}>Delete Quote</ButtonAsLink>;
};

export default withRouter(DeleteQuote);
 */