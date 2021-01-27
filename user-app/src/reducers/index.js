
import {  combineReducers } from 'redux'
import categoryReducer from '../reducers/category.reducer'
import productReducer from './product.reducer'


const rootReducer = combineReducers ({
   
    category : categoryReducer,
    product : productReducer,
    
})

export default rootReducer