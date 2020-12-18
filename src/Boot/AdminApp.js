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
import React, { useState } from 'react'
import Staff from '../Pages/Admin/Staff/Staff'
import AddStaff from '../Pages/Admin/Staff/AddStaff'
import jwtDecode from 'jwt-decode'
import AdminAuthContext from '../Contexts/AdminContext'

const AdminApp = () => {
  const token = localStorage.adminToken

  const [adminInfo, setAdmin] = useState({
    token: localStorage.adminToken ?? localStorage.adminToken,
    role: localStorage.adminToken ? jwtDecode(token).role : null,
  })

  const handleLogin = (token) => {
    localStorage.setItem('adminToken', token)

    const decoded = jwtDecode(token)

    setAdmin({
      token,
      role: decoded.role,
    })
  }

  const handleLogout = () => {
    setAdmin(null)
    localStorage.removeItem('adminToken')
  }

  const contextValue = {
    adminInfo,
    isAuth: adminInfo && !!adminInfo.token,
    handleLogin,
    handleLogout,
  }

  return (
    <AdminAuthContext.Provider value={contextValue}>
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

        <Route path="/admin/staff" exact>
          <Staff />
        </Route>

        <Route path="/admin/add-staff" exact>
          <AddStaff />
        </Route>
      </Switch>
    </AdminAuthContext.Provider>
  )
}

export default AdminApp
