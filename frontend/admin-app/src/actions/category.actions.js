import axiosInstance from '../helpers/axios'
import { categoryConstant } from '../actions/constants'

export const getAllCategories = () => {
    return async dispatch => {
        dispatch({
            type: categoryConstant.GET_ALL_CATEGORY_REQUEST
        })
        const res = await axiosInstance.get(`/category/get`)
        console.log(res)
        if (res.status === 200) {
            const { categoryList } = res.data
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORY_SUCCESS,
                payload: {
                    categories: categoryList
                }
            })
        } else {
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORY_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }
    }
}

export const addCategory = (form) => {
    return async dispatch => {
        dispatch({
            type:categoryConstant.ADD_NEW_CATEGORY_REQUEST
        })
        const res = await axiosInstance.post(`/category/create`, form)
        if (res.status === 200) {
            dispatch({
                type: categoryConstant.ADD_NEW_CATEGORY_SUCCESS,
                payload: {
                    category: res.data.category
                }
            })
        }else{
            dispatch({
                type:categoryConstant.ADD_NEW_CATEGORY_FAILURE,
                payload:{
                    error:res.data.error
                }
            })
        }

    }
}