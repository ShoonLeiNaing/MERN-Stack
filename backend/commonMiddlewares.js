const jwt=require('jsonwebtoken')

exports.requiredSignin = (req,res,next)=>{
    // console.log(req.headers)
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1]
        const user = jwt.verify(token,"MERNECOMMERCE")
        req.user = user
        
    }
    else{
        return res.status(404).json({
            message:"Authorization required"
        })
    }
    next()
    
}

exports.adminMiddleware=(req,res,next)=>{
    if(req.user.role !=='admin'){
        return res.status(404).json({ message: "Acess Denied" })
    }
    next()
}

exports.userMiddleware=(req,res,next)=>{
    if(req.user.role !=='user'){
        return res.status(404).json({ message: "Acess Denied" })
    }
    next()
}