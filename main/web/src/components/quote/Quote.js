import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import QuoteUser from './QuoteUser';
import { IS_LOGGED_IN } from '../../gql/query';
// Keep Quotes from extending wider than 800px
const StyledQuote = styled.article`
  padding-up: 1em
  max-width: 800px;
  margin: 0 auto;
`;

// Style the Quote meta data
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

const Quote = ({ quote }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;

  return (
    <StyledQuote>
      <MetaData>
        <MetaInfo>
          <img
            src={quote.author.avatar}
            alt={`${quote.author.username} avatar`}
            height="50px"
          />
        </MetaInfo>
        <MetaInfo>
          <em>by</em> {quote.author.username} <br />
          {format(quote.createdAt, 'MMM Do YYYY')}  <br />
          {/* quote.quoteBook.id */}
        </MetaInfo>
{/*          {data.isLoggedIn ? (
          <UserActions>
            <QuoteUser quote={quote} />
          </UserActions>
        ) : (
          <UserActions>
            <em>Favorites:</em> {quote.favoriteCount}
          </UserActions>
        )} */}
      </MetaData>
      <ReactMarkdown source={quote.content} />
    </StyledQuote>
  );
};

export default Quote;
