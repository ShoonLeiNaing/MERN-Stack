const User=require('../../models/user')
const jwt=require('jsonwebtoken')
const { validationResult } = require('express-validator')


exports.signup=(req,res)=>{
    
    User.findOne({ email: req.body.email })
    .exec((error,user)=>{
        if(user) return res.status(400).json({
            message : "Admin already register with this email"
        })

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body

        const _user=new User({
            firstName,
            lastName,
            email,
            password,
            username:Math.random().toString(),
            role:'admin'
        })

        _user.save((error,data)=>{
            if(error){
                return res.status(400).json({
                    message:error
                })
            }
            if(data){
                return res.status(200).json({
                    user:data
                })
            }
        })
    })
}

exports.signin=(req,res)=>{
    User.findOne({ email:req.body.email })
    .exec((error,user)=>{
        if(error){
            return res.status(400).json({error})
        }

        if(user){
            if(user.authenticate(req.body.password) && user.role==='admin'){
                const token=jwt.sign({_id:user._id,role:user.role},"MERNECOMMERCE",{expiresIn:'1h'})  
                const { _id,firstName,lastName,email,fullName,role} =user
                res.cookie('token',token,{expiresIn:'1h'})
                return res.status(200).json({
                    token,
                    user : {_id,firstName,lastName,fullName,email,role}
                })
            }
            else{
                return res.status(500).json(error)
            }
        }else{
            return res.status(500).json({message:"Something went wrong"})
        }
    })
}

exports.signout = (req,res) => {
    res.clearCookie('token')
    res.status(200).json({
        message:"Signout successfully ! "
    })
}

exports.requiredSignin = (req,res,next)=>{
    // console.log(req.headers)
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token,"MERNECOMMERCE")
    req.user = user
    next()
}