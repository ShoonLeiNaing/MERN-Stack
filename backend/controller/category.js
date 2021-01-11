const slugify = require('slugify')
const Category = require('../models/category')


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
            children:createCategoryList(categories,i._id)
        })
    }
    return categoryList
}

exports.addCategory=(req,res)=>{
    const categoryObj = {
        name:req.body.name,
        slug:slugify(req.body.name)
    }
    if(req.file){
        categoryObj.categoryImage = "http://localhost:2000/public/"+ req.file.filename
    }
    if(req.body.parentId){
        categoryObj.parentId=req.body.parentId
    }
    const cat = new Category(categoryObj)
    cat.save((error,category)=>{
        if(error){
            return res.status(404).json({error})
        }
        if(category){
            return res.status(200).json({category})
        }
    })
}

exports.getCategories=(req,res)=>{
    Category.find({})
    .exec((error,categories)=>{
        if(error){
            return res.status(400).json({error})
        }
        if(categories){
            const categoryList = createCategoryList(categories)
            return res.status(200).json({categoryList})
        }
    })
}