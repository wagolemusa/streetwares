import { productCaontants } from "../actions/constants";

const initialState = {
    products: []
};

export default (state = initialState, action) => {
    switch(action.type){
        case productCaontants.GET_ALL_PRODUCTS_SECCUSS:
            state = {
                ...state,
                products: action.payload.products
            }
            break;
    }
    return state;
}

