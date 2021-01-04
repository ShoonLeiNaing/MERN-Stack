const User=require('../models/user')

exports.signup=(req,res)=>{
    User.findOne({ email: req.body.email })
    .exec((error,user)=>{
        if(user) return res.status(400).json({
            message : "User already register with this email"
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
            username:Math.random().toString()
        })

        _user.save((error,data)=>{
            if(error){
                return res.status(400).json({
                    message:error
                })
                console.log(error)
            }
            if(data){
                return res.status(200).json({
                    user:data
                })
            }
        })
    })
}