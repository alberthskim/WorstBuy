import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { allProductsThunk } from "../../store/product";
import { Link } from "react-router-dom"
import './allproductspage.css'

function AllProductPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(allProductsThunk())
    }, [dispatch])


    const products = Object.values(useSelector(state => state.products))

    return (
        <div className="main-area">
            <div className="page-content">
                {products.map((product) => (
                    <Link to={`/products/${product.id}`} className="product-details">
                        <div className="products">
                            <img className="product-images"src={product.imageUrl} />
                            <h2>{product.name}</h2>
                            <p>⭐️ {product.reviews.length}</p>
                            <p>${product.price}</p>
                            <button>Add To Cart</button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default AllProductPage