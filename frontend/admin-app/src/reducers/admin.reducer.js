import { adminConstant } from '../actions/constants'

const initialState = {
    error: null,
    message: "",
    loading:false
}

export default  (state=initialState,action)=>{
    switch(action.type){
        case(adminConstant.ADMIN_REGISTER_REQUEST):{
            state = {
                ...state,
                loading:true
            }
            break;
        }
        case(adminConstant.ADMIN_REGISTER_SUCCESS):{
            state = {
                ...state,
                loading:false,
                message:action.payload.message
            }
            break;
        }
        case(adminConstant.ADMIN_REGISTER_FAILURE):{
            state = {
                ...state,
                loading:false,
                message:action.payload.message
            }
            break;
        }
    }
    return state
}