const Cart = require('../models/cart')

exports.addToCart=(req,res)=>{
    Cart.findOne({ user:req.user._id})
    .exec((error,cart)=>{
        if(error){
            return res.status(404).json({ errors:error })
        }
        if(cart){
            //if cart already exists, update the quantity
            const existingProduct = req.body.cartItems.product
            const isProductExist = cart.cartItems.find(c=>c.product == existingProduct )
            if(isProductExist){
                Cart.findOneAndUpdate({ user: req.user._id, "cartItems.product":existingProduct},{
                "$set":{
                    "cartItems.$":{
                        ...req.body.cartItems,
                        quantity: isProductExist.quantity+req.body.cartItems.quantity
                    }
                }
            })
            .exec((error,_cart)=>{
                if(error){
                    return res.status(404).json({ message:error })
                }
                if(_cart){
                    return res.status(200).json({ cart:_cart })
                }
            })
            
            }else{
                Cart.findOneAndUpdate({ user: req.user._id },{
                    "$push":{
                        "cartItems":req.body.cartItems
                    }
                })
                .exec((error,_cart)=>{
                    if(error){
                        return res.status(404).json({ message:error })
                    }
                    if(_cart){
                        return res.status(200).json({ cart:_cart })
                    }
                })
            }
            
            
        }else{
            //if cart does not exist, create one
            const cart = new Cart({
                user:req.user._id,
                cartItems : [req.body.cartItems]
            })
        
            cart.save((error,cart)=>{
                if(error){
                    return res.status(404).json({ error })
                }
                if(cart){
                    return res.status(200).json({ cart })
                }
            })
        }
    })
    
}