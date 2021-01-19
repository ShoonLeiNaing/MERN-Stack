import {categoryConstant} from '../actions/constants'

const initialSate ={
    loading:false,
    error:null,
    categories:[]
}

export default (state=initialSate,action)=>{
    switch(action.type){
        case(categoryConstant.GET_ALL_CATEGORY_SUCCESS):
        state={
            ...state,
            categories:action.payload.categories
        }
        break;
    }
    return state
}