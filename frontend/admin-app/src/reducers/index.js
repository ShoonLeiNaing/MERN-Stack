
import {  combineReducers } from 'redux'
import authReducer  from '../reducers/auth.reducer'
import adminReducer  from '../reducers/admin.reducer'


const rootReducer = combineReducers ({
    auth: authReducer,
    admin: adminReducer
})

export default rootReducer