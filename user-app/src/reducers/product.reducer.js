import { productConstant } from "../actions/constants"

const initialState ={
    product:[],
    productsByPrice:{
        under50k:[],
        under500k:[],
        under1000k:[],
    }
}
export default (state=initialState,action)=>{
    switch(action.type){
        case productConstant.GET_PRODUCT_BY_SLUG:
            state={
                ...state,
                product:action.payload.product,
                productsByPrice:{ 
                    ...action.payload.productsByPrice
                }
            }
            break;
    }
    return state
}