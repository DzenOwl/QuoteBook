import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const QuoteWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid #f5f4f0;
`;

import Quote from './Quote';

const QuoteFeed = ({ quotes }) => {
  //console.log(quotes)
  //quotes.map(quote => (console.log(quote.id)))
  
  return (
    <div>
      {quotes.map(quote => (
        <QuoteWrapper key={quote.id}>
          <Quote quote={quote} />
          <Link to={`/quotebook/${quote.quoteBook.id}/quote/${quote.id}`}>Permalink</Link>
        </QuoteWrapper>
      ))}
    </div>
  );
};

export default QuoteFeed;
