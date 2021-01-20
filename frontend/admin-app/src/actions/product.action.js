import axiosInstance from '../helpers/axios'
import { productConstant } from '../actions/constants'

export const addNewProduct =(form) =>{
    return async dispatch =>{
        const res=await axiosInstance.post(`/product/addproduct`,form)
        console.log(res)
    }
}