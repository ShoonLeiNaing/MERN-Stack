const Category=require('../../models/category')
const Product=require('../../models/product')

function createCategoryList(categories,parentId=null){
    const categoryList=[]
    let category
    if(parentId==null){
        category=categories.filter(x => x.parentId==undefined)
    }
    else{
        category=categories.filter(x => x.parentId==parentId)
    }
    for(let i of category){
        categoryList.push({
            _id:i._id,
            name:i.name,
            slug:i.slug,
            parentId:i.parentId,
            children:createCategoryList(categories,i._id)
        })
    }
    return categoryList
}

exports.initialData = async (req,res)=>{
    const categories= await Category.find({}).exec()
    const products=await Product.find({})
                        // .select('_id name description price productpictures')
                        .populate('category')
                        .exec()
    res.status(200).json({
        categories:createCategoryList(categories),
        products
    })
}