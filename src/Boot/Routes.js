import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Author from '../Pages/Author'
import Genre from '../Pages/Genre'
import Home from '../Pages/Home'
import Book from '../Pages/Book'
import Login from '../Pages/Login'
import Registration from '../Pages/Registration'
import { default as AdminLogin } from '../Pages/Admin/Login'
import Clients from '../Pages/Admin/Clients'
import Books from '../Pages/Admin/Books/Books'
import AddBook from '../Pages/Admin/Books/AddBook'
import EditBook from '../Pages/Admin/Books/EditBook'
import Genres from '../Pages/Admin/Genres/Genres'
import AddGenre from '../Pages/Admin/Genres/AddGenre'
import Authors from '../Pages/Admin/Authors/Authors'
import AddAuthor from '../Pages/Admin/Authors/AddAuthor'

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

        <Route path="/admin">
          <Switch>
            <Route path="/admin/login" exact>
              <AdminLogin />
            </Route>
            <Route path="/admin/clients" exact>
              <Clients />
            </Route>
            <Route path="/admin/books" exact>
              <Books />
            </Route>
            <Route path="/admin/add-book" exact>
              <AddBook />
            </Route>
            <Route path="/admin/edit-book/:bookId" exact>
              <EditBook />
            </Route>

            <Route path="/admin/genres" exact>
              <Genres />
            </Route>
            <Route path="/admin/add-genre" exact>
              <AddGenre />
            </Route>

            <Route path="/admin/authors" exact>
              <Authors />
            </Route>
            <Route path="/admin/add-author" exact>
              <AddAuthor />
            </Route>
          </Switch>
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes
