import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { singleProductThunk} from "../../store/product";
import './singlepagereviewarea.css'
import { useParams, useHistory } from "react-router-dom";
import { deleteReviewThunk } from "../../store/product";
import { singleProductThunk } from "../../store/product";

function SinglePageReviewArea({ product, productId, allReviews}) {
  const reviews = Object.values(allReviews)
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch()

  const handleClick = async (e) => {
    e.preventDefault();
    history.push(`/products/${productId}/reviews`);
    return;
  };

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
    return (number / total).toFixed(1);
  };

  let averageRating = getAverageRating(reviews);

  const getRecommendationAverage = (reviews) => {
    console.log("THIS IS REVIEW", reviews)
    let count = 0;
    let total = reviews.length
    for (let i = 0; i < reviews.length; i++) {
      if(reviews[i].recommendation) {
        if(reviews[i].recommendation === "True") {
          count++
        }
      } else {
        total--
      }
    }

    return [count, total]
  };

  let averageRecommendation = getRecommendationAverage(reviews);

  return (
    <>
      <div className="reviews-area">
        <div className="reviews-top">
          <h2>Guest Ratings & Reviews</h2>

          <div className="review-ratings-info">
            <div className="review-stars-ratings">
              <div className="reviews-info">
                <p>
                  {averageRating > 0 ? (
                    averageRating
                  ) : (
                    <p>No Ratings For This Review</p>
                  )}
                </p>
                <p>⭐️⭐️⭐️⭐️⭐️</p>
                <p>
                  {reviews.length ? (
                    <>{reviews.length} star ratings</>
                  ) : (
                    <>No Reviews Yet</>
                  )}{" "}
                </p>
              </div>
              <div className="recommendation-info">
                <p>
                  {averageRecommendation[1] ? (
                    Math.ceil(parseInt((averageRecommendation[0] / averageRecommendation[1])* 100)) > 50 ? (
                      <>👍🏻</>
                    ) : (
                      <>👎🏻</>
                    )
                  ) : (
                    <>No Recommendation At The Moment</>
                  )}
                </p>
                <p>
                  {averageRecommendation[1] ? (
                    <>
                      <p>{Math.ceil(parseInt((averageRecommendation[0] / averageRecommendation[1])* 100))}% would recommend</p>
                      {averageRecommendation[1] > 1 ? <p>{averageRecommendation[1]} recommendations</p> : <p>{averageRecommendation[1]} recommendation</p>}
                    </>
                  ) : (
                    <>No Recommendation Yet</>
                  )}
                </p>
              </div>
            </div>

            <div className="review-images-area">
              {reviews.map((image) => (
                <div className="product-review-image">
                  <img className="review-img-url" src={image.reviewUrl} />
                </div>
              ))}
              <button onClick={handleClick}>Write a Review</button>
            </div>
          </div>
        </div>

        <div className="Reviews-made">
          <p>We found {product.reviews.length} matching reviews</p>

          <div className="individual-reviews">
            {reviews.toReversed().map((review) => (
              <div className="products-reviews">
                <h3>{review.title}</h3>
                <div className="rating-recommend">
                  <p>⭐️⭐️⭐️⭐️⭐️</p>
                  <p>
                    {review.recommendation ? review.recommendation ? (
                      <p>👍🏻 Would Recommend</p>
                    ) : (
                      <p>👎🏻 Would Not Recommend</p>
                    ): (null)}
                  </p>
                </div>
                <div className="name-posted">
                  <p>
                    {review.displayName} - {review.createdAt},{" "}
                    {review.purchased ? <p>✅ Verified Purchased</p> : null}
                  </p>
                </div>
                <div className="review-content">{review.reviewContent}</div>

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
