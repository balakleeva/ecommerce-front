import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Author from '../Pages/Client/Author'
import Genre from '../Pages/Client/Genre'
import Home from '../Pages/Client/Home'
import Book from '../Pages/Client/Book'
import Login from '../Pages/Client/Login'
import Registration from '../Pages/Client/Registration'
import AuthenticatedRoute from '../HOCs/AuthenticatedRoute'
import Cart from '../Pages/Client/Cart'
import ClientAuthContext from '../Contexts/ClientContext'

const ClientApp = () => {
  const [clientInfo, setClient] = useState({
    token: localStorage.clientToken ?? localStorage.clientToken,
  })

  const contextValue = {
    clientInfo,
    isAuth: clientInfo && !!clientInfo.token,
    setClient: (value) => setClient(value),
  }

  return (
    <ClientAuthContext.Provider value={contextValue}>
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
        <AuthenticatedRoute path="/cart">
          <Cart />
        </AuthenticatedRoute>
      </Switch>
    </ClientAuthContext.Provider>
  )
}

export default ClientApp
