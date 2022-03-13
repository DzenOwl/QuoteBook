import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import DeleteQuote from './DeleteQuote';
import FavoriteQuote from './FavoriteQuote';
import { GET_ME } from '../../gql/query';

const QuoteUser = props => {
  const { loading, error, data } = useQuery(GET_ME);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;

  return (
    <React.Fragment>
      <FavoriteQuote
        me={data.me}
        quoteId={props.quote.id}
        favoriteCount={props.quote.favoriteCount}
      />
      <br />
      {data.me.id === props.quote.author.id && (
        <React.Fragment>
          <Link to={`/editquote/${props.quote.id}`}>Edit</Link> <br />
          {/* <DeleteQuote quoteId={props.quote.id} /> */}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default QuoteUser;
