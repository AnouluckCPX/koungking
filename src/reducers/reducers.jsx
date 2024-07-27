// reducers.js
import { combineReducers } from 'redux';
// Import your individual reducers here
import productsReducer from './productsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    products: productsReducer,
    user: userReducer
    // Add other reducers as needed
});

export default rootReducer;
