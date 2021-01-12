import { authConstant } from '../actions/constants'

export const login=(user)=>{
    console.log(user)
    return (dispatch) =>{
        dispatch({
            type:authConstant.LOGIN_REQUEST,
            payload:{
               ...user,
            }
        })
    }
}