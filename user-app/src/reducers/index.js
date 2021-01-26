
import {  combineReducers } from 'redux'
import categoryReducer from '../reducers/category.reducer'


const rootReducer = combineReducers ({
   
    category : categoryReducer,
    
})

export default rootReducer