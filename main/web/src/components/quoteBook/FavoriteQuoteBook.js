import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import ButtonAsLink from '../ButtonAsLink';
import { TOGGLE_FAVORITE } from '../../gql/mutation';
import { GET_MY_FAVORITE_QUOTEBOOKS } from '../../gql/query';

const FavoriteQuoteBook = props => {
  // store the quoteBook's favorite count as state
  const [count, setCount] = useState(props.favoriteCount);
  // store if the user has favorited the quoteBook as state
  const [favorited, setFavorited] = useState(
    // check if the quoteBook exists in the user favorites list
    props.me.favorites.filter(quoteBook => quoteBook.id === props.quoteBookId).length > 0
  );

  // toggleFavorite mutation hook
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: {
      id: props.quoteBookId
    },
    // refetch the GET_MY_FAVORITE_QUOTEBOOKS query to update the cache
    refetchQueries: [{ query: GET_MY_FAVORITE_QUOTEBOOKS }]
  });

  // if the user has favorited the quoteBook display the option to remove the favorite
  // else display the option to add as a favorite
  return (
    <React.Fragment>
      {favorited ? (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorited(false);
            setCount(count - 1);
          }}
          data-cy="favorite"
        >
          Remove Favorite
        </ButtonAsLink>
      ) : (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorited(true);
            setCount(count + 1);
          }}
          data-cy="favorite"
        >
          Add Favorite
        </ButtonAsLink>
      )}
      : {count}
    </React.Fragment>
  );
};

export default FavoriteQuoteBook;
