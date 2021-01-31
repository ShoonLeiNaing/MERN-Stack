const slugify = require('slugify')
const Category = require('../models/category')


function createCategoryList(categories,parentId=null){
    const categoryList=[]
    let category
    if(parentId==null || parentId==" "){
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

exports.updateCategory=async(req,res)=>{
    const updatedCategories =[]
    const {_id,name,parentId,type} = req.body
    if(name instanceof Array){
        for(let i=0;i<=name.length;i++){
            const category ={
                name:name[i],
                type:type[i]
            }
            if(parentId !== ""){
                category.parentId = parentId[i]
            }
            const updatedCat = await Category.findOneAndUpdate({id:_id[i]},category,{new:true})
            updatedCategories.push(updatedCat)
        }
        return res.status(200).json({ updatedCategories })
    }
    else{
        const category = {
            name,
            type
        }
        if(parentId !== ""){
            category.parentId = parentId
        }
        const updatedCat = await Category.findOneAndUpdate({_id},category,{new:true})
        updatedCategories.push(updatedCat)
        return res.status(200).json({ updatedCategories })
    }
}

exports.deleteCategory =async (req,res)=>{
    const {ids} =req.body.payload
    console.log(ids)
    const deletedItems=[]
    for(let i=0;i<ids.length;i++){
        const deleteCat = await Category.findOneAndDelete({_id:ids[i]._id})
        deletedItems.push(deleteCat)
    }
    if(deletedItems.length == ids.length)
        return res.status(200).json({message:"Okay"})
    
}