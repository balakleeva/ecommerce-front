import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import { addItem, updateItem, removeItem } from './cartHelpers'

const Card = ({
                  product,
                  showViewProductButton = true,
                  showAddToCartButton = true,
                  cartUpdate = false,
                  showRemoveProductButton = false
              }) => {
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)

    const showViewButton = () => (
        showViewProductButton && (
            <Link to={`/product/${product._id}`} className="mr-2">
                <button className="btn btn-outline-primary mt-2 mb-2">
                    View Product
                </button>
            </Link>
        )
    )

    const showCartButton = () => (
        showAddToCartButton && (
            <button
                className="btn btn-outline-warning mt-2 mb-2"
                onClick={addToCart}
            >
                Add to cart
            </button>
        )
    )

    const showRemoveButton = () => (
        showRemoveProductButton && (
            <button
                className="btn btn-outline-danger mt-2 mb-2"
                onClick={() => removeItem(product._id)}
            >
                Remove Product
            </button>
        )
    )

    const showStock = quantity => {
        return quantity > 0 ?
            <span className="badge badge-primary badge-pill">In stock</span> :
            <span className="badge badge-primary badge-pill">Out of stock</span>
    }

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    }

    const shouldRedirect = () => {
        if (redirect) {
            return <Redirect to="/cart"/>
        }
    }

    const handleChange = (event, productId) => {
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value)
        }
    }

    const showCartUpdateOptions = () => {
        return cartUpdate && <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        Adjust quantity
                    </span>
                </div>
                <input
                    type="number"
                    className="form-control"
                    value={count}
                    onChange={(e) => handleChange(e, product._id)}
                />
            </div>
        </div>
    }

    return (
        <div className="card">
            <div className="card-header name">
                {product.name}
            </div>

            <div className="card-body">
                {shouldRedirect()}
                <ShowImage item={product} url="product"/>

                <p className="lead mt-2">{product.description}</p>
                <p className="black-10">${product.price}</p>
                <p className="black-9">Category: {product.category.name}</p>
                <p className="black-8">Added on: {moment(product.createdAt).fromNow()}</p>

                {showStock(product.quantity)}
                <br/>
                {showViewButton()}

                {showCartButton()}

                {showRemoveButton()}

                {showCartUpdateOptions()}
            </div>
        </div>
    )
}

export default Card