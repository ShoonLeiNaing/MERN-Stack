import { adminConstant } from '../actions/constants'
import axiosInstance from '../helpers/axios'

export const signup = (user) => {
    return async dispatch => {
        console.log(user)
        const res = await axiosInstance.post(`/admin/signup`, { ... user })
        dispatch({
            type:adminConstant.ADMIN_REGISTER_REQUEST
        })
        if(res.status === 200){
            const { message } = res.data
            dispatch({
                type:adminConstant.ADMIN_REGISTER_SUCCESS,
                payload : { message }
            })
        }else{
            if(res.status === 404 ){
                dispatch({
                    type:adminConstant.ADMIN_REGISTER_FAILURE,
                    payload : { error : res.data.error}
                })
            }
        }
    }
}