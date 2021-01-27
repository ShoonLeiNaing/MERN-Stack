const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    categoryImage:{ 
        type:String
    },
    slug:{
        type:String,
        required:true,
        trim:true
    },
    type:{
        type:String
    },
    parentId:{
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model('Category',categorySchema)