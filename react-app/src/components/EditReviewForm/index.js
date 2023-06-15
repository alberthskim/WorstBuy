import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateReviewThunk } from "../../store/review";
import { singleProductThunk } from "../../store/product";

function EditReviewForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { productId, reviewId } = useParams()
    const product = useSelector(state => state.products.singleProduct)


    const [rating, setRating] = useState(1)
    const [stars, setStars] = useState("")
    const [qualityRating, setQualityRating] = useState(1)
    const [qualityStars, setQualityStars] = useState(null)
    const [valueRating, setValueRating] = useState(1)
    const [valueStars, setValueStars] = useState(null)
    const [review, setReview] = useState("")
    const [title, setTitle] = useState("")
    const [reviewImageUrl, setReviewImageUrl] = useState("")
    const [purchased, setPurchased]  = useState("")
    const [recommendation, setRecommendation] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [validationErrors, setValidationErrors] = useState({})

    useEffect(() => {
        dispatch(singleProductThunk(productId))
    }, [dispatch])


    if(!Object.values(product).length) return null


    const handleOptionChange = async (e) => {
        setRecommendation(e.target.value)
    }

    const handlePurchaseChange = async (e) => {
        setPurchased(e.target.value)
    }

    const handleReview = async (e) => {
        e.preventDefault();
        const updateReview = {
            rating: Number(stars),
            review_content: review,
            title,
            review_url: reviewImageUrl,
            value: Number(valueStars),
            quality: Number(qualityStars),
            purchased,
            display_name: displayName
        };

        recommendation === 'True' ? updateReview.recommendation = true : updateReview.recommendation = false
        purchased === 'True' ? updateReview.purchased = true : updateReview.purchased = false

        await dispatch(updateReviewThunk(updateReview, reviewId))
        return history.push(`/products/${productId}`)
    }


    return (
        <div className="review container">
            <form onSubmit={handleReview}>
                <div className="review-area">
                    <div className="review-product-image">
                        <h2>Insert the Image here</h2>
                    </div>
                    <div className="form-info">
                        <h2>Edit Review On This Item</h2>
                        <h2>Product Name</h2>
                        <textarea
                            className="review-text"
                            placeholder="Display Name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                        <h3>Overall Rating</h3>
                        <div className="stars-for-rating">
                            <div
                                className={rating >= 1 ? "filled" : "empty"}
                                onMouseEnter={() => setRating(1)}
                                onClick={() => setStars(1)}
                                >
                                <i className="fa-solid fa-star medium-big-star clickable"></i>
                            </div>
                            <div
                                className={rating >= 2 ? "filled" : "empty"}
                                onMouseEnter={() => setRating(2)}
                                onClick={() => setStars(2)}
                                >
                                <i className="fa-solid fa-star medium-big-star clickable"></i>
                            </div>
                            <div
                                className={rating >= 3 ? "filled" : "empty"}
                                onMouseEnter={() => setRating(3)}
                                onClick={() => setStars(3)}
                                >
                                <i className="fa-solid fa-star medium-big-star clickable"></i>
                            </div>
                            <div
                                className={rating >= 4 ? "filled" : "empty"}
                                onMouseEnter={() => setRating(4)}
                                onClick={() => setStars(4)}
                                >
                                <i className="fa-solid fa-star medium-big-star clickable"></i>
                            </div>
                            <div
                                className={rating >= 5 ? "filled" : "empty"}
                                onMouseEnter={() => setRating(5)}
                                onClick={() => setStars(5)}
                                >
                                <i className="fa-solid fa-star medium-big-star clickable"></i>
                            </div>

                        </div>


                        <div className="insert-pic">
                            <h3>Add an image (optional)</h3>
                            <input
                                type="file"
                                name="url"
                                placeholder="Insert Image Url here"
                                value={reviewImageUrl}
                                onChange={(e) => setReviewImageUrl(e.target.value)}
                                className="image-upload"
                            />
                        </div>

                        <div className="review-content-section">
                            <h3>Edit your review</h3>
                            <input
                            className="review-title"
                            placeholder="Review Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                            <p>summarize your thoughts in a short headline</p>
                            <textarea
                            className="review-text"
                            placeholder="Provide a brief description"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            />
                            <p>Minimum length is 20 characters.</p>
                            <h2>Tell us more (optional)</h2>
                            <div className="quality-value">
                                <p>Quality</p>
                                <div className="stars-for-rating">
                                    <div
                                        className={qualityRating >= 1 ? "filled" : "empty"}
                                        onMouseEnter={() => setQualityRating(1)}
                                        onClick={() => setQualityStars(1)}
                                        >
                                        <i className="fa-solid fa-star medium-big-star clickable"></i>
                                    </div>
                                    <div
                                        className={qualityRating >= 2 ? "filled" : "empty"}
                                        onMouseEnter={() => setQualityRating(2)}
                                        onClick={() => setQualityStars(2)}
                                        >
                                        <i className="fa-solid fa-star medium-big-star clickable"></i>
                                    </div>
                                    <div
                                        className={qualityRating >= 3 ? "filled" : "empty"}
                                        onMouseEnter={() => setQualityRating(3)}
                                        onClick={() => setQualityStars(3)}
                                        >
                                        <i className="fa-solid fa-star medium-big-star clickable"></i>
                                    </div>
                                    <div
                                        className={qualityRating >= 4 ? "filled" : "empty"}
                                        onMouseEnter={() => setQualityRating(4)}
                                        onClick={() => setQualityStars(4)}
                                        >
                                        <i className="fa-solid fa-star medium-big-star clickable"></i>
                                    </div>
                                    <div
                                        className={qualityRating >= 5 ? "filled" : "empty"}
                                        onMouseEnter={() => setQualityRating(5)}
                                        onClick={() => setQualityStars(5)}
                                        >
                                        <i className="fa-solid fa-star medium-big-star clickable"></i>
                                    </div>
                                </div>

                                <p>Value</p>
                                <div className="stars-for-rating">
                                    <div
                                        className={valueRating >= 1 ? "filled" : "empty"}
                                        onMouseEnter={() => setValueRating(1)}
                                        onClick={() => setValueStars(1)}
                                        >
                                        <i className="fa-solid fa-star medium-big-star clickable"></i>
                                    </div>
                                    <div
                                        className={valueRating >= 2 ? "filled" : "empty"}
                                        onMouseEnter={() => setValueRating(2)}
                                        onClick={() => setValueStars(2)}
                                        >
                                        <i className="fa-solid fa-star medium-big-star clickable"></i>
                                    </div>
                                    <div
                                        className={valueRating >= 3 ? "filled" : "empty"}
                                        onMouseEnter={() => setValueRating(3)}
                                        onClick={() => setValueStars(3)}
                                        >
                                        <i className="fa-solid fa-star medium-big-star clickable"></i>
                                    </div>
                                    <div
                                        className={valueRating >= 4 ? "filled" : "empty"}
                                        onMouseEnter={() => setValueRating(4)}
                                        onClick={() => setValueStars(4)}
                                        >
                                        <i className="fa-solid fa-star medium-big-star clickable"></i>
                                    </div>
                                    <div
                                        className={valueRating >= 5 ? "filled" : "empty"}
                                        onMouseEnter={() => setValueRating(5)}
                                        onClick={() => setValueStars(5)}
                                        >
                                        <i className="fa-solid fa-star medium-big-star clickable"></i>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="recommendation-area">
                            <h3>Would you recommend this item? (optional)</h3>
                            <div className="choose-option">
                                <h4>Select Option To Apply</h4>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        value="True"
                                        checked={recommendation === 'True'}
                                        onChange={handleOptionChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        value="False"
                                        checked={recommendation === 'False'}
                                        onChange={handleOptionChange}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="recommendation-area">
                            <h3>Did you purchase this item? (optional)</h3>
                            <div className="choose-option">
                                <h4>Select Option To Apply</h4>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        value="True"
                                        checked={purchased === 'True'}
                                        onChange={handlePurchaseChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        value="False"
                                        checked={purchased === 'False'}
                                        onChange={handlePurchaseChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="submit-review-button" onClick={handleReview}>
                    Submit Your New Review
                </button>

            </form>
        </div>
    )
}

export default EditReviewForm;
