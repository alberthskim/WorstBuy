const GET_CART_ITEMS = 'cart/GET_CART_ITEMS'
const ADD_ITEM_TO_CART = 'cart/ADD_ITEM_TO_CART'
const UPDATE_CART_ITEM = 'cart/UPDATE_CART_ITEM'
const DELETE_CART_ITEM = 'cart/DELETE_CART_ITEM'


const getAllCartItems = (cartItems) => ({
    type: GET_CART_ITEMS,
    cartItems
})


const addCartItem = (cartItem) => ({
    type: ADD_ITEM_TO_CART,
    cartItem
})

const updateCartItem = (updatedItem) => ({
    type: UPDATE_CART_ITEM,
    updatedItem
})

const deleteCartItem = (cartId) => ({
    type: DELETE_CART_ITEM,
    cartId
})


export const allCartItemsThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/cart/${userId}`)

    if (response.ok) {
        const userCart = await response.json()
        await dispatch(getAllCartItems(userCart))
        return userCart
    }
}

export const addCartItemThunk = (productId, quantity) => async (dispatch) => {

    const response = await fetch(`/api/cart/items`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({productId, quantity})
    })

    if (response.ok) {
        const addedItem = await response.json()
        await dispatch(addCartItem(addedItem))
        return addedItem
    }
}

export const updateCartItemThunk = (userId, productId, quantity) => async (dispatch) => {
    const response = await fetch(`/api/cart/item/edit`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({userId, productId, quantity})
    })

    if (response.ok) {
        const updatedProduct = await response.json()
        await dispatch(updateCartItem(updatedProduct))
        return updatedProduct
    }
}

export const deleteCartItemThunk = (cartId, userId, productId) => async (dispatch) => {
    const response = await fetch(`/api/cart/item/delete`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({userId, productId})
    })

    if (response.ok) {
        const deletedProduct = await response.json()
        console.log("THIS IS THE STUFF GETTING SENT TO ACTION", deletedProduct )
        await dispatch(deleteCartItem(cartId))
        return deletedProduct
    }
}


const initialState = {}
const cartItemReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_CART_ITEMS:
            newState = {...state}
            action.cartItems.forEach(cartItem => newState[cartItem.id] = cartItem)
            return newState
        case ADD_ITEM_TO_CART:
            newState = {...state}
            newState[action.cartItem.id] = action.cartItem
            return newState
        case UPDATE_CART_ITEM:
            newState = {...state}
            newState[action.updatedItem.id] = {...action.updatedItem}
            return newState
        case DELETE_CART_ITEM:
            newState = {...state}
            delete newState[action.cartId]
            return newState
        default: {
            return state
        }
    }
}

export default cartItemReducer
