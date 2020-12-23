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
import DirectorRoute from '../HOCs/DirectorRoute'
import ManagerRoute from '../HOCs/ManagerRoute'
import MostPopularBook from '../Pages/Admin/Books/MostPopularBook'
import MostPopulerBookRent from '../Pages/Admin/Books/MostPopulerBookRent';
import Orders from '../Pages/Admin/Orders/Orders';
import MakeOrder from '../Pages/Admin/Orders/MakeOrder';
import MostProductiveStaff from '../Pages/Admin/Purchases/MostProductiveStaff';

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
        <ManagerRoute path="/admin/add-book" exact>
          <AddBook />
        </ManagerRoute>
        <AdminRoute path="/admin/edit-book/:bookId" exact>
          <EditBook />
        </AdminRoute>
        <DirectorRoute path="/admin/most-popular-book">
          <MostPopularBook />
        </DirectorRoute>
        <DirectorRoute path="/admin/most-popular-book-rent">
          <MostPopulerBookRent />
        </DirectorRoute>

        <AdminRoute path="/admin/genres" exact>
          <Genres />
        </AdminRoute>
        <ManagerRoute path="/admin/add-genre" exact>
          <AddGenre />
        </ManagerRoute>

        <AdminRoute path="/admin/authors" exact>
          <Authors />
        </AdminRoute>
        <ManagerRoute path="/admin/add-author" exact>
          <AddAuthor />
        </ManagerRoute>

        <DirectorRoute path="/admin/staff" exact>
          <Staff />
        </DirectorRoute>
        <DirectorRoute path="/admin/add-staff" exact>
          <AddStaff />
        </DirectorRoute>


        <AdminRoute path="/admin/purchases/staff-kpi" exact>
          <MostProductiveStaff />
        </AdminRoute>
        <AdminRoute path="/admin/purchases" exact>
          <Purchases />
        </AdminRoute>
        <ManagerRoute path="/admin/add-purchase" exact>
          <AddPurchase />
        </ManagerRoute>
        <AdminRoute path="/admin/purchases/:purchaseId" exact>
          <Purchase />
        </AdminRoute>

        <AdminRoute path="/admin/rents" exact>
          <Rents />
        </AdminRoute>
        <ManagerRoute path="/admin/add-rent" exact>
          <AddRent />
        </ManagerRoute>
        <AdminRoute path="/admin/rents/:rentId" exact>
          <Rent />
        </AdminRoute>

        <ManagerRoute path="/admin/orders" exact>
          <Orders />
        </ManagerRoute>
        <ManagerRoute path="/admin/make-order/:orderId" exact>
          <MakeOrder />
        </ManagerRoute>
      </Switch>
    </AdminAuthContext.Provider>
  )
}

export default AdminApp
