import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import QuoteBookUser from './QuoteBookUser';
import { IS_LOGGED_IN } from '../../gql/query';
// Keep QuoteBooks from extending wider than 800px
const StyledQuoteBook = styled.article`
  max-width: 800px;
  margin: 0 auto;
`;

// Style the QuoteBook meta data
const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`;

// add some space between the avatar and meta info
const MetaInfo = styled.div`
  padding-right: 1em;
`;

// align our UserActions to the right on large screens
const UserActions = styled.div`
  margin-left: auto;
`;

const QuoteBook = ({ quoteBook }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;

  return (
    <StyledQuoteBook>
      <MetaData>
        <MetaInfo>
          <img
            src={quoteBook.author.avatar}
            alt={`${quoteBook.author.username} avatar`}
            height="50px"
          />
        </MetaInfo>
        <MetaInfo>
          <b>{quoteBook.title}</b> <br />
          {quoteBook.comment} <br />
          <em>by</em> {quoteBook.author.username} <br />
          {format(quoteBook.createdAt, 'MMM Do YYYY')}
        </MetaInfo>
        {data.isLoggedIn ? (
          <UserActions>
            <QuoteBookUser quoteBook={quoteBook} />
          </UserActions>
        ) : (
          <UserActions>
            <em>Favorites:</em> {quoteBook.favoriteCount}
          </UserActions>
        )}
      </MetaData>
    </StyledQuoteBook>
  );
};

export default QuoteBook;
