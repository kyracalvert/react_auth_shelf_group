import { combineReducers } from 'redux';

const itemToAdd = (state={}, action) => {
    if (action.type === 'ADD_ITEM_DESCRIPTION'){
        return {...state, description: action.payload}
    } else if (action.type === 'ADD_ITEM_IMAGE'){
        return {...state, image_url: action.payload}
    } else if (action.type === 'RESET_STATE'){
        return (state = {
            description: '',
            image_url: '',
        });
    }
    return state
}

export default combineReducers({
    itemToAdd
})