import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import ClientAuthContext from '../Contexts/ClientContext'

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useContext(ClientAuthContext)

  if (!isAuth) {
    return <Redirect to="/login" />
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />
}

export default AuthenticatedRoute
