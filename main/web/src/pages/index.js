// import React and our routing dependencies
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// import our shared layout component
import Layout from '../components/Layout';

// import our routes
import Home from './home.js';

import SignUp from './signup.js';
import SignIn from './signin.js';

import MyQuoteBooks from './myquotebooks.js';
import Favorites from './favorites.js';
import QuoteBookPage from './quotebook.js';
import NewQuoteBook from './newQuoteBook';
import EditQuoteBook from './editQuoteBook';

import QuotePage from './quote.js';
import QuotesInQuoteBook from './quotesInQuoteBook';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

// define our routes
const Pages = props => {
  return (
    <Router>
      <Layout>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/myqbs" component={MyQuoteBooks} />
          <PrivateRoute path="/favorites" component={Favorites} />
          <Route path="/quoteBook/:id" component={QuoteBookPage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <PrivateRoute path="/newqb" component={NewQuoteBook} />
          <PrivateRoute path="/editqb/:id" component={EditQuoteBook} />
          <PrivateRoute path="/quoteBook/:id/quotes" component={QuotesInQuoteBook} />
          <PrivateRoute path="/quoteBook/:quoteBookId/quote/:quoteId" component={QuotePage} />
          <PrivateRoute path="/editquote/:id" component={EditQuoteBook} />
      </Layout>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;
  return (
    <Route
      {...rest}
      render={props =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default Pages;
