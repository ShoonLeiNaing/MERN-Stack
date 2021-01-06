const express=require('express')
const {validateSignInRequest,validateSignUpRequest,isRequestValidated} = require('../validators/validators')
const { signup, signin, requiredSignin } = require('../controller/auth')
const router=express.Router()
const User=require('../models/user')



router.post('/signin',validateSignInRequest,isRequestValidated,signin)
router.post('/signup',validateSignUpRequest,isRequestValidated,signup)
router.post('/profile',requiredSignin,(req,res)=>{
    res.status(200).json({
        user:"profile"
    })
})


module.exports=router