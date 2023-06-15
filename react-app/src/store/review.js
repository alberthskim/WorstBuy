const GET_REVIEW = 'reviews/GET_REVIEW'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
// const DELETE_REVIEW = 'reviews/DELETE_REVIEW'


const getAllReview = (reviews) => ({
    type: GET_REVIEW,
    reviews
})

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review
})

//MOVED TO PRODUCTS REDUCER SINCE I AM UPDATING THE REVIEW IN THE SINGLE PRODUCT
//AND NOT THE REVIEW STATE
// const deleteReview = (reviewId) => ({
//     type: DELETE_REVIEW,
//     reviewId
// })


export const allReviewThunk = (productId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${productId}`)

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

    if (response.ok) {
        const newReview = await response.json()
        await dispatch(createReview(newReview))
        return newReview
    }
}

export const updateReviewThunk = (review, reviewId) => async (dispatch) => {
    const response = await fetch (`/api/products/reviews/${reviewId}`, {
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


// export const deleteReviewThunk = (reviewId) => async (dispatch) => {
//     const response = await fetch (`/api/products/reviews/${reviewId}`, {
//         method: "DELETE"
//     });

//     if (response.ok) {
//         const deletedResponse = await response.json()
//         await dispatch(deleteReview(reviewId))
//         return deletedResponse;
//     }
// }


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
        case UPDATE_REVIEW:
            newState = {...state}
            newState[action.review.id] = action.review
            return newState
        // case DELETE_REVIEW:
        //     newState = {...state}
        //     delete newState[action.reviewId]
        //     return newState
        default: {
            return state;
        }
    }
}

export default reviewReducer
