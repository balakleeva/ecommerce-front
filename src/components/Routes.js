import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import UserDashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'
import AdminRoute from './auth/PrivateRoute'
import PrivateRoute from './auth/PrivateRoute'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'
import UpdateProduct from './admin/UpdateProduct'
import UpdateCategory from './admin/updateCategory'
import ManageProducts from './admin/ManageProducts'
import Profile from './user/Profile'
import Orders from './admin/Orders'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/cart" exact component={Cart}/>
                <Route path="/shop" exact component={Shop}/>
                <Route path="/product/:productId" exact component={Product}/>

                <PrivateRoute path="/user/dashboard" exact component={UserDashboard}/>
                <PrivateRoute path="/admin/products" exact component={ManageProducts}/>
                <PrivateRoute path="/profile/:userId" exact component={Profile} />

                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
                <AdminRoute path="/create/category" exact component={AddCategory}/>
                <AdminRoute path="/create/product" exact component={AddProduct}/>
                <AdminRoute path="/admin/orders" exact component={Orders} />
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
                <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory}/>
            </Switch>
        </Router>
    )
}

export default Routes