const GET_SAVED_ITEM = 'savedItem/GET_SAVED_ITEM'
const ADD_SAVED_ITEM = 'savedItem/ADD_SAVED_ITEM'
const DELETE_SAVED_ITEM = 'savedItem/DELETE_SAVED_ITEM'

const getAllSavedItems = (savedItems) => ({
    type: GET_SAVED_ITEM,
    savedItem
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
