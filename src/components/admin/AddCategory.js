import React, { useState } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { createCategory } from './apiAdmin'
import { Link } from 'react-router-dom'

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState('')

    const { user, token } = isAuthenticated()

    const handleChange = e => {
        setError('')
        setName(e.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)

        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(true)
                } else {
                    setError(false)
                    setSuccess(true)
                }
            })
    }

    const showSuccess = () => {
        if (success) {
            return (
                <h3 className="text-success">{name} is created</h3>
            )
        }
    }

    const showError = () => {
        if (error) {
            return (
                <h3 className="text-danger">{name} is should be unique</h3>
            )
        }
    }

    const goBack = () => {
        return(
            <div className="mt-5">
                <Link className="text-warning" to="/admin/dashboard">
                    Back to Dashboard
                </Link>
            </div>
        )
    }

    const newCategoryForm = () => {
        return (
            <form onSubmit={clickSubmit}>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={name}
                        autoFocus
                        required
                    />

                    <button className="btn btn-outline-primary mt-1" onClick={clickSubmit}>
                        Submit
                    </button>
                </div>
            </form>
        )
    }

    return (
        <Layout
            title='Add a new category'
            description={`G'day ${user.name}`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>

        </Layout>
    )
}

export default AddCategory
