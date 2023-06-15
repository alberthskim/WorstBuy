const ALL_PRODUCTS = 'products/ALL_PRODUCTS';
const SINGLE_PRODUCT = 'products/SINGLE_PRODUCT'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

const getAllProducts = (products) => ({
    type: ALL_PRODUCTS,
    products
})

const getSingleProduct = (product) => ({
    type: SINGLE_PRODUCT,
    product
})

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

export const allProductsThunk = () => async (dispatch) => {
    const response = await fetch('/api/products')

    if (response.ok) {
        const products = await response.json()
        await dispatch(getAllProducts(products))
        return products
    }
}


export const singleProductThunk = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`)

    if (response.ok) {
        const product = await response.json()
        await dispatch(getSingleProduct(product))
        return product
    }
}


// REVIEWS ROUTE
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await fetch (`/api/products/reviews/${reviewId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const deletedResponse = await response.json()
        await dispatch(deleteReview(reviewId))
        return deletedResponse;
    }
}





const initialState = {allProducts: {}, singleProduct: {}}
const productsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case ALL_PRODUCTS:
            newState = {allProducts: {...action.products}}
            return newState
        case SINGLE_PRODUCT:
            newState = {...state, singleProduct: {...action.product}}
            return newState
        case DELETE_REVIEW:
            newState = {...state, singleProduct: {...state.singleProduct}}
            delete newState.singleProduct.reviews[action.reviewId]
            return newState
        default:
            return state;
    }
}

export default productsReducer
