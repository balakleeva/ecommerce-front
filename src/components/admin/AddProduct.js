import React, { useEffect, useState } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { createProduct, getCategories } from './apiAdmin'

const AddProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })

    const {
        name,
        description,
        price,
        category,
        categories,
        shipping,
        quantity,
        photo,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                })
            }
        })
    }

    const { user, token } = isAuthenticated()

    useEffect(() => {
        init()
    }, [])

    const handleChange = field => event => {
        const value = field === 'photo' ? event.target.files[0] : event.target.value
        formData.set(field, value)
        setValues({ ...values, [field]: value })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: '', loading: true })
        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        price: '',
                        category: '',
                        shipping: '',
                        quantity: '',
                        photo: '',
                        loading: false,
                        createdProduct: data.name
                    })
                }
            })
    }

    const newPostForm = () => {
        return (
            <form className="mb-3" onSubmit={clickSubmit}>
                <h4>Post Photo</h4>
                <div className="form-group">
                    <label className="btn btn-secondary">
                        <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*"/>
                    </label>
                </div>

                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
                </div>

                <div className="form-group">
                    <label className="text-muted">Description</label>
                    <textarea onChange={handleChange('description')} className="form-control" value={description}/>
                </div>

                <div className="form-group">
                    <label className="text-muted">Price</label>
                    <input onChange={handleChange('price')} type="number" className="form-control" value={price}/>
                </div>

                <div className="form-group">
                    <label className="text-muted">Category</label>
                    <select onChange={handleChange('category')} className="form-control">
                        <option>Please select</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="text-muted">Quantity</label>
                    <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity}/>
                </div>

                <div className="form-group">
                    <label className="text-muted">Shipping</label>
                    <select onChange={handleChange('shipping')} className="form-control">
                        <option>Please select</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>

                <button className="btn btn-outline-primary">
                    Create Product
                </button>
            </form>
        )
    }

    const showError = () => {
        return (
            <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        )
    }

    const showSuccess = () => {
        return (
            <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
                <h2>{createdProduct.name} is created</h2>
            </div>
        )
    }

    const showLoading = () => {
        return (
            <div className="alert alert-success" style={{ display: loading ? '' : 'none' }}>
                <h2>Loading...</h2>
            </div>
        )
    }

    return (
        <Layout
            title='Add a new product'
            description={`G'day ${user.name}`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>

        </Layout>
    )
}

export default AddProduct