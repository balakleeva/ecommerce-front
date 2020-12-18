import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AdminRoute = ({ component: Component, ...rest }) => {
	const token = localStorage.clientToken
	return (
		<Route
			{...rest}
			render={(props) =>
				token ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	)
}

export default AdminRoute
