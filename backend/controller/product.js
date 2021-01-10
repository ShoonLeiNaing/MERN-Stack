const Product=require('../models/product')
const slugify = require('slugify')

exports.addProduct = (req,res)=>{
    // return res.status(200).json({ message:req.body })
    const{ name,description,price,quantity,category,createdBy} = req.body
    let pictures = []
    if(req.files.length > 0){
        pictures = req.files.map((file)=>{
            return { img : file.filename }
        })
    }
    const product = new Product({
        name,
        slug:slugify(name),
        description,
        price,
        quantity,
        category,
        pictures,
        createdBy:req.user._id
    })
    product.save((error,product)=>{
        if(error){
            return res.status(404).json({ errors: error })
        }
        if(product){
            return res.status(200).json({ product })
        }
    })
}