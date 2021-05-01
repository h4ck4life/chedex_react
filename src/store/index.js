import { createStore } from 'redux';

const initialState = {
    results: [],
    keyword: ''
};

const reducer = (state = initialState, action) => {
    if (action.type === 'SAVE_RESULT') {
        return Object.assign({}, state, {
            results: action.payload
        });
    }
    if (action.type === 'SAVE_KEYWORD') {
        return Object.assign({}, state, {
            keyword: action.payload
        });
    }
    return state;
};

const store = createStore(reducer);

export default store;