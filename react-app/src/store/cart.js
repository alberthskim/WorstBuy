const GET_CART_ITEMS = 'cart/GET_CART_ITEMS'
const ADD_ITEM_TO_CART = 'cart/ADD_ITEM_TO_CART'
const UPDATE_CART_ITEM = 'cart/UPDATE_CART_ITEM'
const DELETE_CART_ITEM = 'cart/DELETE_CART_ITEM'


const getAllCartItems = (cartItems) => ({
    type: GET_CART_ITEMS,
    cartItems
})


const addCartItem = (productId, quantity) => ({
    type: ADD_ITEM_TO_CART,
    productId,
    quantity
})

const updateCartItem = (cartId, quantity) => ({
    type: UPDATE_CART_ITEM,
    cartId,
    quantity
})

const deleteCartItem = (userId, productId) => ({
    type: DELETE_CART_ITEM,
    userId,
    productId
})


export const allCartItemsThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/cart/${userId}`)

    if (response.ok) {
        const userCart = await response.json()
        await dispatch(getAllCartItems(userCart))
        return userProducts
    }
}

export const addCartItemThunk = (productId, quantity) => async (dispatch) => {
    const response = await fetch(`/api/cart/items`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(productId, quantity)
    })

    if (response.ok) {
        const addedProduct = await response.json()
        await dispatch(addCartItem(productId, quantity))
        return addedProduct
    }
}

export const updateCartItemThunk = (userId, productId, quantity) => async (dispatch) => {
    const response = await fetch(`/api/cart/item/edit`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userId, productId, quantity)
    })

    if (response.ok) {
        const updatedProduct = await response.json()
        await dispatch(updateCartItem(cartId))
        return updatedProduct
    }
}

export const deleteCartItemThunk = (userId, productId) => async (dispatch) => {
    const response = await fetch(`/api/cart/item/delete`, {
        method: "DELETE"
    })

    if (response.ok) {
        const deletedProduct = await response.json()
        await dispatch(deleteCartItem(userId, productId))
        return deletedProduct
    }
}


const initialState = {cartItems: {}}
const cartItemReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_CART_ITEMS:
            newState = {...state}
            action.cartItems.forEach(cartItem => newState.cartItems[cartItem.id] = cartItem)
            return newState
        case UPDATE_CART_ITEM:
            newState = {...state}
            newState.cartItems[action.cartId.quantity] = action.quantity
            return newState
    }
}

export default cartItemReducer
