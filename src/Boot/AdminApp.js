import { Route, Switch } from 'react-router-dom'
import { default as AdminLogin } from '../Pages/Admin/Login'
import Clients from '../Pages/Admin/Clients/Clients'
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
import AdminRoute from '../HOCs/AdminRoute'
import Purchases from '../Pages/Admin/Purchases/Purchases'
import Purchase from '../Pages/Admin/Purchases/Purchase'
import AddPurchase from '../Pages/Admin/Purchases/AddPurchase'
import Rents from '../Pages/Admin/Rents/Rents'
import AddRent from '../Pages/Admin/Rents/AddRent'
import Rent from '../Pages/Admin/Rents/Rent'

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
        <AdminRoute path="/admin/clients" exact>
          <Clients />
        </AdminRoute>
        <AdminRoute path="/admin/books" exact>
          <Books />
        </AdminRoute>
        <AdminRoute path="/admin/add-book" exact>
          <AddBook />
        </AdminRoute>
        <AdminRoute path="/admin/edit-book/:bookId" exact>
          <EditBook />
        </AdminRoute>

        <AdminRoute path="/admin/genres" exact>
          <Genres />
        </AdminRoute>
        <AdminRoute path="/admin/add-genre" exact>
          <AddGenre />
        </AdminRoute>

        <AdminRoute path="/admin/authors" exact>
          <Authors />
        </AdminRoute>
        <AdminRoute path="/admin/add-author" exact>
          <AddAuthor />
        </AdminRoute>

        <AdminRoute path="/admin/staff" exact>
          <Staff />
        </AdminRoute>
        <AdminRoute path="/admin/add-staff" exact>
          <AddStaff />
        </AdminRoute>

        <AdminRoute path="/admin/purchases" exact>
          <Purchases />
        </AdminRoute>
        <AdminRoute path="/admin/add-purchase" exact>
          <AddPurchase />
        </AdminRoute>
        <AdminRoute path="/admin/purchases/:purchaseId" exact>
          <Purchase />
        </AdminRoute>

        <AdminRoute path="/admin/rents" exact>
          <Rents />
        </AdminRoute>
        <AdminRoute path="/admin/add-rent" exact>
          <AddRent />
        </AdminRoute>
        <AdminRoute path="/admin/rents/:rentId" exact>
          <Rent />
        </AdminRoute>
      </Switch>
    </AdminAuthContext.Provider>
  )
}

export default AdminApp
