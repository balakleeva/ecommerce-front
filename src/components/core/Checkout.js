import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { createOrder, getBraintreeClientToken, processPayment } from './apiCore'
import DropIn from 'braintree-web-drop-in-react'
import { emptyCart } from './cartHelpers'

const Checkout = ({ products }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    let deliveryAddress = data.address

    const getToken = () => {
        getBraintreeClientToken(userId, token)
            .then(response => {
                if (data.error) {
                    setData({ ...data, error: response.error })
                } else {
                    setData({ ...data, clientToken: response.clientToken })
                }
            })
    }

    useEffect(() => {
        getToken()
    }, [])

    const getTotal = () => {
        return products.reduce((sum, product) => {
            return sum + product.count * product.price
        }, 0)
    }

    const showCheckout = () => (
        isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-success">Sign in to checkout</button>
            </Link>

        )
    )

    const buy = () => {
        setData({ ...data, loading: true })
        let nonce
        let getNonce = data.instance.requestPaymentMethod().then(data => {
            nonce = data.nonce
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal()
            }

            processPayment(userId, token, paymentData)
                .then(response => {
                    const createOrderData = {
                        products,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount,
                        address: deliveryAddress,
                    }
                    createOrder(userId, token, createOrderData).then(response => {
                        emptyCart(() => {
                            setData({
                                ...data,
                                success: response.success,
                                loading: false
                            })
                        })
                    })
                })
                .catch(error => {
                    console.log('error', error)
                    setData({ ...data, loading: true })
                })
        }).catch(err => {
            console.log('dropping error', err)
            setData({ ...data, error: err.message })
        })
    }

    const showError = () => {
        return (
            <div className="alert alert-danger" style={{ display: data.error ? '' : 'none' }}>
                {data.error}
            </div>
        )
    }

    const showSuccess = () => {
        return (
            <div className="alert alert-info" style={{ display: data.success ? '' : 'none' }}>
                Thanks! Your payment was successful
            </div>
        )
    }

    const showLoading = () => (
        data.loading && <h2>Loading...</h2>
    )

    const handleAddress = event => {
        setData({ ...data, address: event.target.value })
    }

    const showDropIn = () => {
        return (
            <div onBlur={() => setData({ ...data, error: '' })}>
                {data.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn
                            options={{
                                authorization: data.clientToken,
                                paypal: {
                                    flow: 'vault'
                                }
                            }}
                            onInstance={instance => (data.instance = instance)}

                        >
                            <div className="form-group mb-3">
                                <label className="text-muted">Delivery for:</label>
                                <textarea
                                    onChange={handleAddress}
                                    className="form-control"
                                    value={data.address}
                                    placeholder="Type your delivery address here..."
                                />
                            </div>
                        </DropIn>
                        <button onClick={buy} className="btn btn-success">Pay</button>
                    </div>
                ) : null}
            </div>
        )
    }

    return (
        <div>
            <h2>Total ${getTotal()}</h2>
            {showLoading()}
            {showSuccess()}
            {showError()}
            {showCheckout()}
        </div>
    )
}

export default Checkout