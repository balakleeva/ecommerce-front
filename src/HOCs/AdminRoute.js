import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AdminAuthContext from '../Contexts/AdminContext'

const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useContext(AdminAuthContext)

  if (!isAuth) {
    return <Redirect to="/admin/login" />
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />
}

export default AdminRoute
