import { combineReducers } from 'redux';

const onShelf = (state=[], action) => {
    if (action.type === 'DISPLAY_ITEMS') {
        return action.payload;
    }
    return state
}

export default onShelf;