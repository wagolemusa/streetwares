
import axios from "../helpers/axios"
import { userContants } from "./constants"

// Signup authantication
export const signup = (user) =>{
    console.log(user)
    return async (dispatch) => {
        dispatch({ type: userContants.USER_REGISTER_REQUEST });
        const res = await axios.post("/admin/signup", {
            ...user
        })
        if(res.status === 200){
            const { message } = res.data; 
            dispatch({
                type: userContants.USER_REGISTER_SECCESS,
                payload: { message }
            })
        }else{
            if(res.status === 400){
                dispatch({
                    type: userContants.USER_REGISTER_FAILURE,
                    payload: {error: res.data.error}
                });
            }
        }

    }
}
