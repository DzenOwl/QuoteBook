import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import DeleteQuoteBook from './DeleteQuoteBook';
import FavoriteQuoteBook from './FavoriteQuoteBook';
import { GET_ME } from '../../gql/query';

const QuoteBookUser = props => {
  const { loading, error, data } = useQuery(GET_ME);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;

  return (
    <React.Fragment>
      <FavoriteQuoteBook
        me={data.me}
        quoteBookId={props.quoteBook.id}
        favoriteCount={props.quoteBook.favoriteCount}
      />
      <br />
      {data.me.id === props.quoteBook.author.id && (
        <React.Fragment>
          <Link to={`/editqb/${props.quoteBook.id}`}>Edit</Link> <br />
          <DeleteQuoteBook quoteBookId={props.quoteBook.id} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default QuoteBookUser;
