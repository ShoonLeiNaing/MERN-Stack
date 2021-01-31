import { categoryConstant } from '../actions/constants'
import Category from '../containers/Category'

const initialSate = {
    loading: false,
    error: null,
    categories: []
}


const buildNewCategories = (parentId, categories, category) => {
    let categoryArray = []
    if(parentId == undefined || parentId ==null || parentId==" "){
        return [
            ...categories,
            {
                _id:category._id,
                name:category.name,
                slug:category.slug,
                parentId:category.parentId,
                children:[]
            }
        ]
    }
    for (let cat of categories) {
        if (cat._id == parentId) {
            categoryArray.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId,[...cat.children,{
                    _id:category._id,
                    name:category.name,
                    slug:category.slug,
                    parentId:category.parentId,
                    children:category.children
                }], category) : []
            })
        }else{
            categoryArray.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId,cat.children, category) : []
            })
        }
    }
    return categoryArray;
}

export default (state = initialSate, action) => {
    switch (action.type) {
        case (categoryConstant.GET_ALL_CATEGORY_SUCCESS):
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case (categoryConstant.ADD_NEW_CATEGORY_REQUEST):
            state = {
                ...state,
                loading: true,
            }
            break;
        case (categoryConstant.ADD_NEW_CATEGORY_SUCCESS):
            // const updatedCategory=buildNewCategories(state.categories,action.payload.category)
            // console.log(updatedCategory)
            const category = action.payload.category
            const updatedCategory = buildNewCategories(category.parentId, state.categories, category)
            state = {
                ...state,
                categories: updatedCategory,
                loading: false
            }
            break;
        case (categoryConstant.ADD_NEW_CATEGORY_FAILURE):
            state = {
                ...initialSate,
                loading: false
            }
            break;
    }
    return state
}