import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import AdminApp from './AdminApp'
import ClientApp from './ClientApp'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={AdminApp} />
        <Route path="/" component={ClientApp} />
      </Switch>
    </Router>
  )
}

export default Routes
