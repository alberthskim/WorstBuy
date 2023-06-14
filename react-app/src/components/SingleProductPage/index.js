import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { allProductsThunk, singleProductThunk} from "../../store/product";
// import './landingpage.css'
import { useParams, useHistory } from "react-router-dom";

function SingleProductPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { productId } = useParams();
    const products = useSelector(state => state.products[productId])

    useEffect(() => {
        dispatch(allProductsThunk())
    }, [dispatch])

    const handleClick = async (e) => {
        e.preventDefault()
        history.push(`/products/${productId}/reviews`)
        return;
    }

    if (!products) return <div>Loading...</div>

    return (
        <div className="whole-page">
            <div className="product-description">
                <div className="left-side">
                    <h2>{products.name}</h2>
                    <img src={products.imageUrl}></img>
                    {/* {products.productImages.forEach((product) => (
                        <div className="products">
                            <img src={product.imageUrl} />
                        </div>
                    ))} */}
                </div>
                <div className="top-right">
                    <span>${products.price}</span>
                    <div className="ratings">
                        <span>⭐️ {products.reviews.length}</span>
                    </div>
                    <div className="quantity-cart">
                        <button>quantity</button>
                        <button>Add to Cart</button>
                    </div>
                </div>
                <div className="bottom">
                   <h1>About this item</h1>
                   <h3>Description</h3>
                   <div className="description">
                        <p>{products.description}</p>
                   </div>
                </div>
                <div className="reviews-area">
                    <div className="reviews-top">
                        <h2>Guest Ratings & Reviews</h2>
                        <div className="review-ratings-info">
                            <div className="review-stars-ratings">
                                <p>Review Average</p>
                                <p>⭐️</p>
                                <p>{products.reviews.length} star ratings</p>
                                <p>Percentage of recommendation</p>
                            </div>
                            <div className="review-images-area">
                                <p>Map all the review images here</p>
                                <button onClick={handleClick}>Write a Review</button>
                            </div>
                        </div>
                    </div>

                    <div className="Reviews-made">
                        <p>We found (total amount of reviews) matching reviews</p>
                        <div className="individual-reviews">
                            <p>Map out all the reviews made including the individuals name</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SingleProductPage;
