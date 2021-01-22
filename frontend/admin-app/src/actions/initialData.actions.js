import axiosInstance from "../helpers/axios"
import { categoryConstant, initialDataConstant, productConstant } from "./constants"



export const getAllInitialData = ()=>{
    return async dispatch =>{
        const res=await axiosInstance.get('/initialData')
        if(res.status === 200){
            const { categories,products } = res.data
            dispatch({
                type:categoryConstant.GET_ALL_CATEGORY_SUCCESS,
                payload:{categories}
            })
            dispatch({
                type:productConstant.GET_ALL_PRODUCT_SUCCESS,
                payload:{products}
            })
        }
        console.log(res)
    }

}