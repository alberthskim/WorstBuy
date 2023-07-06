const GET_SAVED_ITEM = 'savedItem/GET_SAVED_ITEM'
const ADD_SAVED_ITEM = 'savedItem/ADD_SAVED_ITEM'
const DELETE_SAVED_ITEM = 'savedItem/DELETE_SAVED_ITEM'

const getAllSavedItems = (savedItems) => ({
    type: GET_SAVED_ITEM,
    savedItems
})

const addSavedItem = (savedItem) => ({
    type: ADD_SAVED_ITEM,
    savedItem
})

const deleteSavedItem = (itemId) => ({
    type: DELETE_SAVED_ITEM,
    itemId
})


export const allSavedItemsThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/savedItem/${userId}`)

    if (response.ok) {
        const itemList = await response.json()
        await dispatch(getAllSavedItems(itemList))
        return itemList
    }
}


export const addSavedItemThunk = (productId) => async (dispatch) => {
    const response = await fetch(`/api/savedItem/item`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({productId})
    })

    if (response.ok) {
        const saved = await response.json()
        await dispatch(addSavedItem(saved))
        return saved
    }
}


export const deleteSavedItemThunk = (savedItemId, productId, userId) => async (dispatch) => {
    const response = await fetch(`/api/savedItem/item/delete`, {
        method: "DELETE"
    })

    if (response.ok) {
        const deletedItem = await response.json()
        await dispatch(deleteSavedItem(savedItemId))
        return deletedItem
    }
}

const initialState = {}
const savedItemReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_SAVED_ITEM:
            newState = {...state}
            action.savedItems.forEach(savedItem => newState[savedItem.id] = savedItem)
            return newState
        case ADD_SAVED_ITEM:
            newState = {...state}
            newState[action.savedItem.id] = action.savedItem
            return newState
        default: {
            return state;
        }
    }
}

export default savedItemReducer;
