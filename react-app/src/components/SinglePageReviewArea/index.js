import React from "react";
import { useSelector, useDispatch } from "react-redux";
import './singlepagereviewarea.css'
import { useHistory } from "react-router-dom";
import { deleteReviewThunk } from "../../store/product";

function SinglePageReviewArea({ productId, allReviews}) {
  const reviews = Object.values(allReviews)
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch()



  const handleClick = async (e) => {
    e.preventDefault();
    history.push(`/products/${productId}/reviews`);
    return;
  };

  const starRating = (rating) => {
    let stars = []
    for(let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<i className="fa-solid fa-star" style={{color: '#ffe000'}}></i>)
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

  const getAverageRatingNumber = (reviews) => {
    let number = 0;
    let total = reviews.length
    for (let i = 0; i < reviews.length; i++) {
      if(reviews[i].rating) {
        number += reviews[i].rating;
      } else {
        total--
      }
    }
    return (number / total).toFixed(1);
  };

  const getRecommendationAverage = (reviews) => {
    let count = 0;
    let total = reviews.length
    for (let i = 0; i < reviews.length; i++) {
        if(reviews[i].recommendation === "True") {
          count++
        }
    }
    return [count, total]
  };

  let averageRecommendation = getRecommendationAverage(reviews);

  const getAverageValue = (reviews) => {
    let count = 0;
    let total = reviews.length
    for(let i = 0; i < reviews.length; i++) {
      if(reviews[i].value > 0) {
        count += reviews[i].value
      } else {
        total--
      }
    }

    if (count === 0) return 0;
    return (count / total).toFixed(1);
  }

  const getAverageQuality = (reviews) => {
    let count = 0;
    let total = reviews.length
    for(let i = 0; i < reviews.length; i++) {
      if(reviews[i].quality > 0) {
        count += reviews[i].quality
      } else {
        total--
      }
    }

    if (count === 0) return 0;
    return (count / total).toFixed(1);
  }

  return (
    <>
      <div className="reviews-area">
        <div className="reviews-top">
          <h3 className="ratings-reviews-header">Guest Ratings & Reviews</h3>

          <div className="review-ratings-info">
            <div className="review-stars-ratings">
              <div className="reviews-info">
                  {reviews.length ? (
                    <div className="review-things">
                      <h3 className="avg-header">{getAverageRatingNumber(reviews)}</h3>
                      <p className="stars-area">{getAverageRating(reviews)}</p>
                      <p className="rating-stars-area">{reviews.length} star ratings</p>
                    </div>
                  ) : (
                    <div>
                      <p className="no-ratings">No Ratings For This Review</p>
                      <p>No Reviews Yet</p>
                    </div>
                  )}
              </div>
              <div className="value-quality">
                    {getAverageValue(reviews) ? (
                    <div className="value-area">
                      <h3 className="value-num">{getAverageValue(reviews)}</h3>
                      <p className="value-wording">Value<br />out of 5</p>
                    </div>
                    ) : (
                      null
                    )}
                    {getAverageQuality(reviews) ? (
                      <div className="quality-area">
                        <h3 className="quality-num">{getAverageQuality(reviews)}</h3>
                        <p className="quality-wording">Quality<br />out of 5</p>
                      </div>
                    ) : (
                      null
                    )}
              </div>
              <div className="recommendation-info">
                  {averageRecommendation[1] ? (
                    Math.ceil(parseInt((averageRecommendation[0] / averageRecommendation[1])* 100)) >= 50 ? (
                      <p><i className="far fa-check-circle fa-lg"></i></p>
                    ) : (
                      <p><i className="fas fa-times fa-lg"></i></p>
                    )
                  ) : (
                    <>No Recommendation At The Moment</>
                  )}
                  {averageRecommendation[1] ? (
                    <>
                      <p>{Math.ceil(parseInt((averageRecommendation[0] / averageRecommendation[1])* 100))}% would recommend</p>
                      {averageRecommendation[1] > 1 ? <p>{averageRecommendation[1]} recommendations</p> : <p>{averageRecommendation[1]} recommendation</p>}
                    </>
                  ) : (
                    <p>No Recommendation Yet</p>
                  )}
              </div>
            </div>

            <div className="review-images-area">
              {reviews.map((image) => (
                <div className="product-review-image">
                  {!image.reviewUrl ? (
                    null
                  ) : (
                    <>
                      <h3 className="review-image-header">Review Images</h3>
                      <img className="review-img-url" src={image.reviewUrl} onError={(e) => e.target.src ="https://i.imgur.com/VikcUQA.png"} alt="review-img"/>
                    </>
                  )}
                </div>
              ))}
              {user && !reviews.find(review => review.userId === user.id) && (
                <button className="review-button" onClick={handleClick}>Write a Review</button>
              )}
            </div>
          </div>
        </div>

        <div className="Reviews-made">

          <div className="individual-reviews">
            <h4 className="review-amount">We found {reviews.length} Matching Reviews</h4>
            {reviews.toReversed().map((review) => (
              <div className="products-reviews">
                <h3>{review.title}</h3>
                <div className="rating-recommend">
                  <p className="star-rate">{starRating(review.rating)}</p>
                    {review.recommendation === "True" ? (
                      <p><i className="far fa-check-circle"></i> Would Recommend</p>
                    ) : (
                      <p><i className="fas fa-times"></i> Would Not Recommend</p>
                    )}
                </div>
                <div className="name-posted">
                  <p className="display-name">
                    {review.displayName} - {review.createdAt.slice(0,16)},
                  </p>
                  <p>
                    {review.purchased === "True" ? <p className="verified">Verified Purchaser</p> : null}
                  </p>
                </div>
                <div className="review-content" style={{wordBreak: 'break-word'}}>{review.reviewContent}</div>

                {user && user.id === review.userId && (
                  <div className="edit-delete">
                    <button onClick={() => history.push(`/products/${productId}/reviews/${review.id}/edit`)}>Edit Review</button>
                    <button onClick={() => {
                      dispatch(deleteReviewThunk(review.id))
                      // dispatch(singleProductThunk(productId))
                      }}>Delete Review</button>
                  </div>
                )}
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePageReviewArea;
