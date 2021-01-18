import { authConstant } from '../actions/constants'

const initialState = {
    token:"",
    user : {
        firstName:" ",
        secondName:" ",
        email:" ",
        picture:" "
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message:""
}
export default (state=initialState,action)=>{
    console.log(action)
    // console.log(user)
    switch(action.type){
        case(authConstant.LOGIN_REQUEST):
        state = {
            ...state,
            authenticating: true
        }
        break;

        case(authConstant.LOGIN_SUCCESS):
        state = {
            ...state,
            token:action.payload.token,
            user:action.payload.user,
            authenticate:true,
            authenticating:false
        }
        break;

        // case(authConstant.LOGIN_FAILURE):
        // state = {
        //     ...initialState,
        // }
        // break;

        
        case(authConstant.LOGOUT_REQUEST):
        state = {
            ...state,
            loading:true
        }
        break;

        case(authConstant.LOGIN_SUCCESS):
        state = {
            ...initialState,
            // message:action.payload.message,
            loading:false
        }
        break;

        case(authConstant.LOGOUT_FAILURE):
        state={
            ...state,
            loading:false,
            error:action.payload.error
        }
        break;
    }
    return state
}