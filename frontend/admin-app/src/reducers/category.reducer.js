import { categoryConstant } from '../actions/constants'
import Category from '../containers/Category'

const initialSate = {
    loading: false,
    error: null,
    categories: []
}
// const buildNewCategories =(categories,category)=>{
//     let categoryArray=[]
//     for(let cat of categories){
//         categoryArray.push({
//             ...cat,
//             children:cat.children && cat.children.length > 0 ? buildNewCategories(cat.children,category):[]
//         })
       
//     }
   
//     return categoryArray
// }

const buildNewCategories = (parentId, categories, category) => {
    let categoryArray = []
    for (let cat of categories) {
        if (cat._id == parentId) {
            categoryArray.push({
                ...cat,
                children: cat.children && cat.children.length > 0 ? buildNewCategories(parentId,[...cat.children,{
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
                children: cat.children && cat.children.length > 0 ? buildNewCategories(parentId,cat.children, category) : []
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