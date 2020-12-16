import React from 'react';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Author from '../Pages/Author';
import Genre from '../Pages/Genre';
import Home from '../Pages/Home';

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/genre">Genre</Link>
            </li>
            <li>
              <Link to="/author">Author</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/author">
            <Author />
          </Route>
          <Route path="/genre">
            <Genre />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
