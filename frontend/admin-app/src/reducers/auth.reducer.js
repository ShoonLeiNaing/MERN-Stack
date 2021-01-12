import { authConstant } from '../actions/constants'

const initialState = {
    name:"Shoon"
}
export default (state=initialState,action)=>{
    console.log(action)
    // console.log(user)
    switch(action.type){
        case(authConstant.LOGIN_REQUEST):
        state = {
            ...state,
            ...action.payload,
        }
        break;
    }
    return state
}