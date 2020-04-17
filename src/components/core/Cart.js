import React, { useEffect, useState } from 'react'
import { getCart, removeItem } from './cartHelpers'
import Layout from './Layout'
import { Link } from 'react-router-dom'
import Card from './Card'
import Checkout from './Checkout'

const Cart = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        setItems(getCart())
    }, [])

    const showItems = () => {
        return (
            <div>
                <h2>Your cart has {items.length} items</h2>
                <hr/>
                {items.map(product => (
                    <Card
                        key={product._id}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                    />
                ))}
            </div>
        )
    }

    const noItemsMessage = () => {
        return (
            <h2>
                Your cart is empty.
                <br/>
                <Link to="/shop">Continue shopping</Link>
            </h2>
        )
    }

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems() : noItemsMessage()}
                </div>

                <div className="col-6">
                    <h2>Your cart summary</h2>
                    <hr/>
                    <Checkout products={items}/>
                </div>
            </div>
        </Layout>
    )
}

export default Cart