import axios from 'axios'
import { authConstant } from '../actions/constants'
import store from '../store'

const token = window.localStorage.getItem('token')
const axiosInstance = axios.create({
    
    baseURL:'http://localhost:2000/api',
    headers:{
        'Authorization': token? `Bearer ${token}`:' '
    }
})

axiosInstance.interceptors.request.use((req)=>{
    const {auth} =store.getState()
    if(auth.token){
        req.headers.Authorization=`Bearer ${auth.token}`
    }
    return req
})
axiosInstance.interceptors.response.use((res)=>{
    return res;
},(error)=>{
    console.log(error.response)
    const{ status} = error.response;
    if(status === 500){
        localStorage.clear()
        store.dispatch({type:authConstant.LOGOUT_SUCCESS})
    }
    return Promise.reject(error)
})

export default axiosInstance;