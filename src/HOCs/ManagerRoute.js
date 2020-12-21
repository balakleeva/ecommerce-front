import React, { useContext } from 'react'
import AdminAuthContext from '../Contexts/AdminContext'
import { Redirect, Route } from 'react-router-dom'
import { isDirector, isManager } from '../Utils/roles'

export const ManagerRoute = ({ component: Component, ...rest }) => {
  const { isAuth, adminInfo } = useContext(AdminAuthContext)

  if (!isAuth) {
    return <Redirect to="/admin/login" />
  }

  if (!isManager(adminInfo.role) || !isDirector(adminInfo.role)) {
    return <Redirect to="/admin/books" />
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />
}

export default ManagerRoute
