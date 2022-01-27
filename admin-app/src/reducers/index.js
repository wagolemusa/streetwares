import authReducers from "./authReducers";
import userReducers from "./userReducers";
import categoryReducers from "./categoryReducers";
import orderReducers from "./orderReducers";
import productReducers from "./productReducers";

import  { combineReducers } from 'redux'


const rootReducer = combineReducers({
    auth: authReducers,
    user: userReducers,
    category: categoryReducers,
    product: productReducers,
    order: orderReducers
});

export default rootReducer;