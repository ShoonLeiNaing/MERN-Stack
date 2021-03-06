const User=require('../models/user')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')


exports.signup=(req,res)=>{
    User.findOne({ email: req.body.email })
    .exec(async(error,user)=>{
        if(user) return res.status(400).json({
            message : "User already register with this email"
        })

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body
        const hashPassword=await bcrypt.hash(password,10)

        const _user=new User({
            firstName,
            lastName,
            email,
            hashPassword,
            username:Math.random().toString()
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
            return res.status(404).json({error})
        }

        if(user){
            if(user.authenticate(req.body.password)){
                const token=jwt.sign({_id:user._id,role:user.role},"MERNECOMMERCE",{expiresIn:'1h'})
                const { _id,firstName,lastName,email,fullName,role} =user
                return res.status(200).json({
                    token,
                    user : {_id,firstName,lastName,fullName,email,role}
                })
            }
            else{
                return res.status(404).json({
                    message:"Invalid Password"
                })
            }
        }else{
            return res.status(404).json({message:"Something went wrong"})
        }
    })
}

exports.requiredSignin = (req,res,next)=>{
    // console.log(req.headers)
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token,"MERNECOMMERCE")
    req.user = user
    next()
}