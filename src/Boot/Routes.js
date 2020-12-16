import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Author from '../Pages/Author';
import Genre from '../Pages/Genre';
import Home from '../Pages/Home';
import Book from '../Pages/Book';
import Login from '../Pages/Login';
import Registration from '../Pages/Registration';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/author" exact>
          <Author />
        </Route>
        <Route path="/genre" exact>
          <Genre />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/books/:bookId" exact>
          <Book />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/registration" exact>
          <Registration />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
