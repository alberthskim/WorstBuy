const ALL_PRODUCTS = 'products/ALL_PRODUCTS';
const SINGLE_PRODUCT = 'products/SINGLE_PRODUCT'

const getAllProducts = (products) => ({
    type: ALL_PRODUCTS,
    products
})

const getSingleProduct = (productId) => ({
    type: SINGLE_PRODUCT,
    productId
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

const initialState = {}
const productsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case ALL_PRODUCTS:
            newState = {...action.products}
            return newState
        default:
            return state;
    }
}

export default productsReducer
