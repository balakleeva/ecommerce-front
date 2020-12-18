import { Route, Switch } from 'react-router-dom'
import { default as AdminLogin } from '../Pages/Admin/Login'
import Clients from '../Pages/Admin/Clients'
import Books from '../Pages/Admin/Books/Books'
import AddBook from '../Pages/Admin/Books/AddBook'
import EditBook from '../Pages/Admin/Books/EditBook'
import Genres from '../Pages/Admin/Genres/Genres'
import AddGenre from '../Pages/Admin/Genres/AddGenre'
import Authors from '../Pages/Admin/Authors/Authors'
import AddAuthor from '../Pages/Admin/Authors/AddAuthor'
import React from 'react'

const AdminApp = () => (
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
)

export default AdminApp
