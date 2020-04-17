import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { listRelated, read } from './apiCore'
import Card from './Card'

const Product = (props) => {
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const [error, setError] = useState(false)

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data)
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setRelatedProduct(data)
                    }
                })
            }
        })
    }

    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    }, [props])

    return (
        <Layout
            title={`${product && product.name}`}
            description={`${product && product.description}`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-8">
                    <h2 className="mb-4">Single product</h2>
                    {product && product.description && <Card
                        product={product}
                        showViewProductButton={false}
                    />}
                </div>

                <div className="col-4">
                    <h4>Related Products</h4>
                    {relatedProduct.map(product => (
                        <div key={product._id} className="mb-3">
                            <Card product={product}/>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Product