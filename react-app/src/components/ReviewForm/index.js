import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { singleProductThunk } from "../../store/product";
import './reviewform.css'
import { createReviewThunk } from "../../store/review";

function ReviewForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { productId } = useParams()
    const user = useSelector(state => state.session.user)
    const product = useSelector(state => state.products.singleProduct)


    const [rating, setRating] = useState(0)
    const [stars, setStars] = useState("")
    const [qualityRating, setQualityRating] = useState(0)
    const [qualityStars, setQualityStars] = useState(null)
    const [valueRating, setValueRating] = useState(0)
    const [valueStars, setValueStars] = useState(null)
    const [review, setReview] = useState("")
    const [title, setTitle] = useState("")
    const [reviewImageUrl, setReviewImageUrl] = useState("")
    const [purchased, setPurchased]  = useState("")
    const [recommendation, setRecommendation] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [validationErrors, setValidationErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const errors = {};
        if (!rating || rating < 0) errors.rating = "Must Submit A Rating"
        if (!review || review.trim().length < 20 || review.trim().length > 500) errors.review = "Minimum length must be 20 characters and less than 500 characters."
        if (!title || title.trim().length < 1 || title.trim().length > 50) errors.title = "Title must be 1 character and less than 100 characters."
        if (reviewImageUrl && (!reviewImageUrl.includes('.png') && !reviewImageUrl.includes('.jpg') && !reviewImageUrl.includes('.jpeg'))) errors.reviewImageUrl = "Review Image URL must end in .png, .jpg, .jpeg"
        if (!purchased) errors.purchased = "Must Choose an option"
        if (!recommendation) errors.recommendation = "Must Choose an option"
        if (!displayName || displayName.trim().length < 4 || displayName.trim().length > 20) errors.displayName = "Name must be 4 characters and less than 20 characters."

        setValidationErrors(errors);
    }, [rating, review, title, reviewImageUrl, purchased, recommendation, displayName])

    const handleOptionChange = async (e) => {
        setRecommendation(e.target.value)
    }

    const handlePurchaseChange = async (e) => {
        setPurchased(e.target.value)
    }

    const handleReview = async (e) => {
        e.preventDefault();

        setSubmitted(true);

        if(!Object.values(validationErrors).length) {
            const newReview = {
                rating: Number(stars),
                review_content: review,
                title,
                review_url: reviewImageUrl,
                value: Number(valueStars),
                quality: Number(qualityStars),
                purchased,
                recommendation,
                display_name: displayName
            };

            await dispatch(createReviewThunk(newReview, productId))
            return history.push(`/products/${productId}`)
        }
    }

    useEffect(() => {
        dispatch(singleProductThunk(productId))
    }, [dispatch])

    if(!user) history.push('/login')

    return (
        <div className="review-container">

            <form onSubmit={handleReview}>
                <div className="review-area">

                    <div className="review-product-image">
                        <img className="review-img" src={product.imageUrl} alt="review-pic"/>
                    </div>

                    <div className="form-info">
                        <h2>Review This Item</h2>
                        <h2>{product.name}</h2>
                        <p>{product.model}</p>
                        <textarea
                            className="review-text"
                            placeholder="Display Name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                        {validationErrors.displayName && submitted && (
                            <p className="errors">{validationErrors.displayName}</p>
                        )}
                        <h3>Overall Rating</h3>
                        <div className="stars-for-rating">
                            <div
                                className={rating >= 1 ? "filled" : "empty"}
                                onMouseEnter={() => setRating(1)}
                                onMouseLeave={() => {if (!stars) setRating(0)}}
                                onClick={() => setStars(1)}
                                >
                                <i className="fa-solid fa-star medium-big-star clickable"></i>
                            </div>
                            <div
                                className={rating >= 2 ? "filled" : "empty"}
                                onMouseEnter={() => setRating(2)}
                                onMouseLeave={() => {if (!stars) setRating(0)}}
                                onClick={() => setStars(2)}
                                >
                                <i className="fa-solid fa-star medium-big-star clickable"></i>
                            </div>
                            <div
                                className={rating >= 3 ? "filled" : "empty"}
                                onMouseEnter={() => setRating(3)}
                                onMouseLeave={() => {if (!stars) setRating(0)}}
                                onClick={() => setStars(3)}
                                >
                                <i className="fa-solid fa-star medium-big-star clickable"></i>
                            </div>
                            <div
                                className={rating >= 4 ? "filled" : "empty"}
                                onMouseEnter={() => setRating(4)}
                                onMouseLeave={() => {if (!stars) setRating(0)}}
                                onClick={() => setStars(4)}
                                >
                                <i className="fa-solid fa-star medium-big-star clickable"></i>
                            </div>
                            <div
                                className={rating >= 5 ? "filled" : "empty"}
                                onMouseEnter={() => setRating(5)}
                                onMouseLeave={() => {if (!stars) setRating(0)}}
                                onClick={() => setStars(5)}
                                >
                                <i className="fa-solid fa-star medium-big-star clickable"></i>
                            </div>
                        </div>
                        {validationErrors.rating && submitted && (
                            <p className="errors">{validationErrors.rating}</p>
                        )}


                        <div className="insert-pic">
                            <h3>Add an image (optional)</h3>
                            <input
                                type="input"
                                name="url"
                                placeholder="Insert Image Url here"
                                value={reviewImageUrl}
                                onChange={(e) => setReviewImageUrl(e.target.value)}
                                className="image-upload"
                            />
                        </div>
                        {validationErrors.reviewImageUrl && submitted && (
                            <p className="errors">{validationErrors.reviewImageUrl}</p>
                        )}

                        <div className="review-content-section">
                            <h3>Write your review</h3>
                            <input
                            className="review-title"
                            placeholder="Review Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                            {validationErrors.title && submitted && (
                            <p className="errors">{validationErrors.title}</p>
                            )}
                            <p className="under-review">Summarize your thoughts in a short headline</p>
                            <textarea
                            className="review-text-info"
                            placeholder="Provide a brief description"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            />
                            <p className="under-review">Please write atleast 20 characters.</p>
                            {validationErrors.review && submitted && (
                            <p className="errors">{validationErrors.review}</p>
                            )}

                            <h3>Tell us more (optional)</h3>
                            <div className="quality-value">
                                <p>Quality</p>
                                <div className="stars-for-rating">
                                    <div
                                        className={qualityRating >= 1 ? "filled" : "empty"}
                                        onMouseEnter={() => setQualityRating(1)}
                                        onMouseLeave={() => {if (!qualityStars) setQualityRating(0)}}
                                        onClick={() => setQualityStars(1)}
                                        >
                                        <i className="fa-solid fa-star medium-big-star clickable"></i>
                                    </div>
                                    <div
                                        className={qualityRating >= 2 ? "filled" : "empty"}
                                        onMouseEnter={() => setQualityRating(2)}
                                        onMouseLeave={() => {if (!qualityStars) setQualityRating(0)}}
                                        onClick={() => setQualityStars(2)}
                                        >
                                        <i className="fa-solid fa-star medium-big-star clickable"></i>
                                    </div>
                                    <div
                                        className={qualityRating >= 3 ? "filled" : "empty"}
                                        onMouseEnter={() => setQualityRating(3)}
                                        onMouseLeave={() => {if (!qualityStars) setQualityRating(0)}}
                                        onClick={() => setQualityStars(3)}
                                        >
                                        <i className="fa-solid fa-star medium-big-star clickable"></i>
                                    </div>
                                    <div
                                        className={qualityRating >= 4 ? "filled" : "empty"}
                                        onMouseEnter={() => setQualityRating(4)}
                                        onMouseLeave={() => {if (!qualityStars) setQualityRating(0)}}
                                        onClick={() => setQualityStars(4)}
                                        >
                                        <i className="fa-solid fa-star medium-big-star clickable"></i>
                                    </div>
                                    <div
                                        className={qualityRating >= 5 ? "filled" : "empty"}
                                        onMouseEnter={() => setQualityRating(5)}
                                        onMouseLeave={() => {if (!qualityStars) setQualityRating(0)}}
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
                                        onMouseLeave={() => {if (!valueStars) setValueRating(0)}}
                                        onClick={() => setValueStars(1)}
                                        >
                                        <i className="fa-solid fa-star medium-big-star clickable"></i>
                                    </div>
                                    <div
                                        className={valueRating >= 2 ? "filled" : "empty"}
                                        onMouseEnter={() => setValueRating(2)}
                                        onMouseLeave={() => {if (!valueStars) setValueRating(0)}}
                                        onClick={() => setValueStars(2)}
                                        >
                                        <i className="fa-solid fa-star medium-big-star clickable"></i>
                                    </div>
                                    <div
                                        className={valueRating >= 3 ? "filled" : "empty"}
                                        onMouseEnter={() => setValueRating(3)}
                                        onMouseLeave={() => {if (!valueStars) setValueRating(0)}}
                                        onClick={() => setValueStars(3)}
                                        >
                                        <i className="fa-solid fa-star medium-big-star clickable"></i>
                                    </div>
                                    <div
                                        className={valueRating >= 4 ? "filled" : "empty"}
                                        onMouseEnter={() => setValueRating(4)}
                                        onMouseLeave={() => {if (!valueStars) setValueRating(0)}}
                                        onClick={() => setValueStars(4)}
                                        >
                                        <i className="fa-solid fa-star medium-big-star clickable"></i>
                                    </div>
                                    <div
                                        className={valueRating >= 5 ? "filled" : "empty"}
                                        onMouseEnter={() => setValueRating(5)}
                                        onMouseLeave={() => {if (!valueStars) setValueRating(0)}}
                                        onClick={() => setValueStars(5)}
                                        >
                                        <i className="fa-solid fa-star medium-big-star clickable"></i>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="recommendation-area">
                            <div className="choose-option">
                                <h3>Would you recommend this item?</h3>
                                <h4>Select Option To Apply</h4>
                                <label>
                                    <input
                                        type="radio"
                                        value="True"
                                        checked={recommendation === 'True'}
                                        onChange={handleOptionChange}
                                    />
                                    Yes
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="False"
                                        checked={recommendation === 'False'}
                                        onChange={handleOptionChange}
                                    />
                                    No
                                </label>
                            </div>
                            {validationErrors.recommendation && submitted && (
                            <p className="errors">{validationErrors.recommendation}</p>
                            )}
                        </div>

                        <div className="purchased-area">
                            <h3>Did you purchase this item?</h3>
                            <div className="choose-option">
                                <h4>Select Option To Apply</h4>
                                <label>
                                    <input
                                        type="radio"
                                        value="True"
                                        checked={purchased === 'True'}
                                        onChange={handlePurchaseChange}
                                    />
                                    Yes
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="False"
                                        checked={purchased === 'False'}
                                        onChange={handlePurchaseChange}
                                    />
                                    No
                                </label>
                            </div>
                            {validationErrors.purchased && submitted && (
                            <p className="errors">{validationErrors.purchased}</p>
                            )}
                        </div>
                        <button type="submit" className="submit-review-button" onClick={handleReview}>
                            Submit Review
                        </button>
                    </div>
                </div>



            </form>


        </div>
    )
};


export default ReviewForm;
