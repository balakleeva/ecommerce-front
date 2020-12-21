import React, { useContext } from 'react'
import AdminAuthContext from '../Contexts/AdminContext'
import { Redirect, Route } from 'react-router-dom'

export const DirectorRoute = ({ component: Component, ...rest }) => {
  const { isAuth, adminInfo } = useContext(AdminAuthContext)

  if (!isAuth) {
    return <Redirect to="/admin/login" />
  }

  if (adminInfo.role !== 'директор') {
    return <Redirect to="/admin/books" />
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />
}

export default DirectorRoute
