const GET_REVIEW = 'reviews/GET_REVIEW'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'


const getAllReview = (reviews) => ({
    type: GET_REVIEW,
    reviews
})

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

const updateReview = (reviewId) => ({
    type: CREATE_REVIEW,
    reviewId
})

const deleteReview = (reviewId) => ({
    type: CREATE_REVIEW,
    reviewId
})


export const allReviewThunk = () => async (dispatch) => {
    const response = await fetch('/api/reviews')

    if (response.ok) {
        const reviews = await response.json()
        await dispatch(getAllReview(reviews))
        return reviews
    }
}


export const createReviewThunk = (review, productId) => async (dispatch) => {
    const response = await fetch (`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(review)
    });
    console.log("INSIDE THUNK RESPONSE", response)

    if (response.ok) {
        const newReview = await response.json()
        await dispatch(createReview(newReview))
        return newReview
    }
}

export const updateReviewThunk = (review, productId) => async (dispatch) => {
    const response = await fetch (`/api/products/${productId}/reviews/${review.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const updatedReview = await response.json()
        await dispatch(updateReview(updatedReview))
        return updatedReview
    }
}
export const deleteReviewThunk = (review, productId) => async (dispatch) => {
    const response = await fetch (`/api/products/${productId}/reviews/${review.id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const deletedReview = await response.json()
        await dispatch(deleteReview(deletedReview))
        return "Successfully Deleted"
    }
}


const initialState = {}
const reviewReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_REVIEW:
            newState = {...state, ...action.reviews}
            return newState
        case CREATE_REVIEW:
            newState = {...state}
            newState[action.review.id] = action.review
            return newState
        case DELETE_REVIEW:
            newState = {...state}
            delete newState[action.review.id]
            return newState
        case UPDATE_REVIEW:
            newState = {...state}
            newState[action.review.id] = action.review
            return newState
        default: {
            return state;
        }
    }
}

export default reviewReducer
