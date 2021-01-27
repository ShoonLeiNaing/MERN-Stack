const Product=require('../models/product')
const Category = require('../models/category')
const slugify = require('slugify')
const category = require('../models/category')

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

exports.getProductsBySlug = (req,res)=>{
    const{slug}=req.params
    Category.findOne({slug:slug}).select('_id')
    .exec((error,category)=>{
        if(error){
            return res.status(404).json({error})
        }
        if(category){
            Product.find({category:category})   
            .exec((error,product)=>{
                if(error){
                    return res.status(404).json({error})
                }
                if(product.length>0){
                    return res.status(200).json({
                        product,
                        productsByPrice : {
                            under50k : product.filter(x => x.price <= 50000),
                            under500k : product.filter(x => x.price > 50000 && x.price <= 500000),
                            under1000k : product.filter(x => x.price > 500000 && x.price <= 1000000),
                        }

                    })
                }
            })
        }
        
    })
}