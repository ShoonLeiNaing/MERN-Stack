import axios from 'axios'

const token = window.localStorage.getItem('token')
const axiosInstance = axios.create({
    
    baseURL:'http://localhost:2000/api',
    headers:{
        'Authorization': token? `Bearer ${token}`:' '
    }
})

export default axiosInstance;