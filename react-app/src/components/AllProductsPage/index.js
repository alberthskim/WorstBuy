import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { allProductsThunk } from "../../store/product";
import { addCartItemThunk } from "../../store/cart";
import { Link } from "react-router-dom"
import './allproductspage.css'

function AllProductPage() {
    const dispatch = useDispatch()
    const products = Object.values(useSelector(state => state.products.allProducts))

    useEffect(() => {
        dispatch(allProductsThunk())
    }, [dispatch])


    return (
        <div className="main-area-product">
            <div className="page-content">
                {products.map((product) => (
                    <div className="product-detail-container">
                        <Link to={`/products/${product.id}`} className="product-details">
                            <div className="products">
                                <div className="pics">
                                    <img className="product-images"src={product.imageUrl} alt="products" />
                                </div>
                                <div className="product-deets">
                                    <h3>{product.name}</h3>
                                    <p>⭐️ {product.reviews.length}</p>
                                </div>
                                <div className="product-price">
                                    <p>${product.price}</p>
                                </div>
                            </div>
                        </Link>
                        <button className="add-cart" onClick={() => {
                            dispatch(addCartItemThunk(product.id, 1));
                            alert("Added To Cart")
                            }}>Add To Cart</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllProductPage
