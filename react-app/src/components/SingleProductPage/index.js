import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { singleProductThunk} from "../../store/product";
// import './landingpage.css'
import { useParams, useHistory } from "react-router-dom";

function SingleProductPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { productId } = useParams();
    const product = useSelector(state => state.products.singleProduct)

    useEffect(() => {
        dispatch(singleProductThunk(productId))
    }, [dispatch])

    const handleClick = async (e) => {
        e.preventDefault()
        history.push(`/products/${productId}/reviews`)
        return;
    }

    if (!Object.values(product).length) {
        console.log("NO PRODUCT")
        return <div>Loading...</div>
    }

    const getAverageRating = (product) => {
        let ratings = product.reviews
        let number = 0;
        for (let i = 0; i < ratings.length; i++) {
            number += ratings[i].rating
        }
        return (number / ratings.length).toFixed(1)
    }

    let averageRating = getAverageRating(product)

    const getRecommendationAverage = (product) => {
        let recommendation = product.reviews
        let count = 0;
        for (let i = 0; i < recommendation.length; i++) {
            if(recommendation[i].recommendation !== null) {
                if(recommendation[i].recommendation === true) {
                    count++
                }
            }
        }
        return Math.ceil(parseInt((count / recommendation.length) * 100))
    }

    let averageRecommendation = getRecommendationAverage(product)

    if(!product) return <h1>Loading...</h1>
    
    return (
        <div className="whole-page">
            <div className="product-description">
                <div className="left-side">
                    <h2>{product.name}</h2>
                    <img src={product.imageUrl}></img>
                    {product.productImages.map((product) => (
                        <div className="products">
                            <img src={product.imageUrl} />
                        </div>
                    ))}
                </div>
                <div className="top-right">
                    <span>${product.price}</span>
                    <div className="ratings">
                        <span>⭐️ {product.reviews.length}</span>
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
                        <p>{product.description}</p>
                   </div>
                </div>
                <div className="reviews-area">
                    <div className="reviews-top">
                        <h2>Guest Ratings & Reviews</h2>
                        <div className="review-ratings-info">
                            <div className="review-stars-ratings">
                                <div className="reviews-info">
                                    <p>{averageRating > 0 ? averageRating : <p>No Ratings For This Review</p>}</p>
                                    <p>⭐️⭐️⭐️⭐️⭐️</p>
                                    <p>{product.reviews.length ? <>{product.reviews.length} star ratings</> : <>No Reviews Yet</>} </p>
                                </div>
                                <div className="recommendation-info">
                                    <p>{averageRecommendation ? (averageRecommendation > 50 ? <>👍🏻</> : <>👎🏻</>) : <>No Recommendation At The Moment</>}</p>
                                    <p>{averageRecommendation > 0 ? <>{averageRecommendation}% would recommend</> : <>No Recommendation Yet</>}</p>
                                </div>
                            </div>
                            <div className="review-images-area">
                                {product.reviews.map((product) => (
                                    <div className="product-review-image">
                                        <img src={product.reviewUrl} />
                                    </div>
                                 ))}
                                <button onClick={handleClick}>Write a Review</button>
                            </div>
                        </div>
                    </div>

                    <div className="Reviews-made">
                        <p>We found {product.reviews.length} matching reviews</p>
                        <div className="individual-reviews">
                            {product.reviews.map((review) => (
                            <div className="products-reviews">
                                <h3>{review.title}</h3>
                                <div className="rating-recommend">
                                    <p>⭐️⭐️⭐️⭐️⭐️</p>
                                    <p>{review.recommendation ? <p>👍🏻 Would Recommend</p> : <p>👎🏻 Would Not Recommend</p>}</p>
                                </div>
                                <div className="name-posted">
                                    <p>{review.displayName} - {review.createdAt}, {review.purchased ? <p>✅ Verified Purchased</p> : null} </p>
                                </div>
                                <div className="review-content">
                                    {review.reviewContent}
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SingleProductPage;
