
import {  combineReducers } from 'redux'
import authReducer  from '../reducers/auth.reducer'
import adminReducer  from '../reducers/admin.reducer'
import categoryReducer from '../reducers/category.reducer'
import productReducer from '../reducers/product.reducer'
import orderReducer from '../reducers/order.reducer'

const rootReducer = combineReducers ({
    auth: authReducer,
    admin: adminReducer,
    category : categoryReducer,
    product : productReducer,
    order : orderReducer
})

export default rootReducer