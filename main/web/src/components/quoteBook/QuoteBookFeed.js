import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const QuoteBookWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid #f5f4f0;
`;

import QuoteBook from './QuoteBook';

const QuoteBookFeed = ({ quoteBooks }) => {
  return (
    <div>
      {quoteBooks.map(quoteBook => (
        <QuoteBookWrapper key={quoteBook.id}>
          <QuoteBook quoteBook={quoteBook} />
          <Link to={`/quoteBook/${quoteBook.id}`}>Permalink</Link> <br />
          {/* <Link to={`/quoteBook/${quoteBook.id}/quotes`}>Quotes</Link> */}
        </QuoteBookWrapper>
      ))}
    </div>
  );
};

export default QuoteBookFeed;
