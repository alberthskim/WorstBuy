import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { singleProductThunk} from "../../store/product";
import './singlepagereviewarea.css'
import { useHistory } from "react-router-dom";
import { deleteReviewThunk } from "../../store/product";
import { singleProductThunk } from "../../store/product";

function SinglePageReviewArea({ product, productId, allReviews}) {
  const reviews = Object.values(allReviews)
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch()


  // const userReview = reviews.find(review => review.userId === user.id)
  // console.log("THIS IS THE userREVIEW", userReview)


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

  return (
    <>
      <div className="reviews-area">
        <div className="reviews-top">
          <h3 className="ratings-reviews-header">Guest Ratings & Reviews</h3>

          <div className="review-ratings-info">
            <div className="review-stars-ratings">
              <div className="reviews-info">
                  {reviews.length ? (
                    <div>
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
              <div className="recommendation-info">
                  {averageRecommendation[1] ? (
                    Math.ceil(parseInt((averageRecommendation[0] / averageRecommendation[1])* 100)) >= 50 ? (
                      <p>👍🏻</p>
                    ) : (
                      <p>👎🏻</p>
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
                  ): (
                    <img className="review-img-url" src={image.reviewUrl} />
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
            {reviews.toReversed().map((review) => (
              <div className="products-reviews">
                <h3>{review.title}</h3>
                <div className="rating-recommend">
                  <p className="star-rate">{starRating(review.rating)}</p>
                  <p>
                    {review.recommendation === "True" ? (
                      <p>👍🏻 Would Recommend</p>
                    ) : (
                      <p>👎🏻 Would Not Recommend</p>
                    )}
                  </p>
                </div>
                <div className="name-posted">
                  <p>
                    {review.displayName} - {review.createdAt},
                  </p>
                  <p>
                    {review.purchased === "True" ? <p>✅ Verified Purchaser</p> : null}
                  </p>
                </div>
                <div className="review-content" style={{'word-break': 'break-word'}}>{review.reviewContent}</div>

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
