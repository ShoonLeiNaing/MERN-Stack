import { authConstant } from '../actions/constants'
import axiosInstance from '../helpers/axios'


export const login=(user)=>{
    console.log(user)
    return async (dispatch) =>{
        const res = await axiosInstance.post(`/admin/signin`,{ ...user })
        dispatch({
            type:authConstant.LOGIN_REQUEST
        })
        if(res.status === 200){
            const { token, user } = res.data
            localStorage.setItem('token',token)
            localStorage.setItem('user',JSON.stringify(user))
            dispatch({
                type:authConstant.LOGIN_SUCCESS,
                payload:{
                    token,user
                }
            })
        }else{
            if(res.status === 404){
                dispatch({
                    type:authConstant.LOGIN_FAILURE,
                    payload:{
                        error : res.data.error
                    }
                })
            }
        }     
    }
}



export const isUserLoggedIn = ()=>{
    return async dispatch =>{
        const token = localStorage.getItem('token')
        if(token){
            const user = JSON.parse(localStorage.getItem('user')) 
            dispatch({
                type:authConstant.LOGIN_SUCCESS,
                payload:{
                    token,user
                }
            })
        }else{
            dispatch({
                type:authConstant.LOGIN_FAILURE,
                payload:{
                    error : "Fail to retrieve data"
                }
            })
        }
    }
}
export const signout = ()=>{
    return (dispatch) =>{
        localStorage.clear()
        dispatch({
            type:authConstant.LOGOUT_REQUEST
        })
    }
}