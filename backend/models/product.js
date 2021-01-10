const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    quantity:{
        type:Number,
        required:true
    },
    pictures : [
        { img : { type:String } }
    ],
    offer: {
        type:String
    },
    review:[
        {
            userId : { type:mongoose.Schema.Types.ObjectId, ref:'User'},
            review : String
        }
    ],
    category : { type:mongoose.Schema.Types.ObjectId, ref:'Category'},
    createdBy : { type:mongoose.Schema.Types.ObjectId, ref:'User'},
    updatedAt: Date

},{timestamps:true})

module.exports=mongoose.model('Product',productSchema)