
import { initalDataConstants, categoryConstansts,productCaontants  } from "./constants"
import axios from "../helpers/axios";


export const getInitialData = () => {
    return  async dispatch => {
        const res = await axios.post(`/admin/product`);

        if (res.status == 200){
            const { categories, products } = res.data;
            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories }
            });

            dispatch({
                type: productCaontants.GET_ALL_PRODUCTS_SECCUSS,
                payload: { products }
            })
        }
        console.log(res)
    }

}