import React from 'react';
import { useMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';

import ButtonAsLink from '../ButtonAsLink';
import { DELETE_QUOTEBOOK } from '../../gql/mutation';
import { GET_MY_QUOTEBOOKS, GET_QUOTEBOOKS } from '../../gql/query';

const DeleteQuoteBook = props => {
  const [deleteQuoteBook] = useMutation(DELETE_QUOTEBOOK, {
    variables: {
      id: props.quoteBookId
    },
    // refetch the quotebooks list queries to update the cache
    refetchQueries: [{ query: GET_MY_QUOTEBOOKS, GET_QUOTEBOOKS }],
    onCompleted: data => {
      // redirect the user to the "my quotebooks" page
      props.history.push('/myqbs');
    }
  });

  return <ButtonAsLink onClick={deleteQuoteBook}>Delete Quote Book</ButtonAsLink>;
};

export default withRouter(DeleteQuoteBook);
