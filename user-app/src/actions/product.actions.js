import axiosInstance from "../helpers/axios"
import { productConstant } from "./constants"

export const getProductBySlug = (slug)=>{
    return async dispatch=>{
        const res = await axiosInstance.get(`/product/${slug}`)
       if(res.status === 200){
           dispatch({
               type:productConstant.GET_PRODUCT_BY_SLUG,
               payload : res.data 
           })
       }
    }
}