import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { allProductsThunk } from "../../store/product";
import { addCartItemThunk } from "../../store/cart";
import { Link, useHistory } from "react-router-dom"
import { allCartItemsThunk } from "../../store/cart";
import './allproductspage.css'

function AllProductPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const products = Object.values(useSelector(state => state.products.allProducts))
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(allProductsThunk())
        if (user) {
            dispatch(allCartItemsThunk(user.id))
        }
    }, [dispatch])

    const starRating = (rating) => {
        let stars = []
        for(let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<i class="fa-solid fa-star" style={{color: '#ffe000'}}></i>)
            } else {
                stars.push(<i className="far fa-star" style={{color: 'lightgray'}}></i>)
            }
        }
        return stars
    }

    const getAverageRating = (reviews) => {
        let number = 0;
        let total = reviews.length
        for (let i = 0; i < reviews.length; i++) {
          if(reviews[i].rating) {
            number += reviews[i].rating;
          } else {
            total--
          }
        }
        return starRating((number / total).toFixed(1));
    };

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
                                    <p>{getAverageRating(product.reviews)} ({product.reviews.length})</p>
                                </div>
                                <div className="product-price">
                                    <p>${product.price}</p>
                                </div>
                            </div>
                        </Link>
                        {!user ? (
                            <button className="add-cart" onClick={() => {
                                alert("Must Be Logged In First!")
                                history.push('/login')
                                }}>Add To Cart</button>
                        ) : (
                            <button className="add-cart" onClick={() => {
                                dispatch(addCartItemThunk(product.id, 1));
                                alert("Added To Cart")
                                }}>Add To Cart</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllProductPage
