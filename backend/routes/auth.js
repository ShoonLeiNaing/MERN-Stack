const express=require('express')
const { signup, signin, requiredSignin } = require('../controller/auth')
const router=express.Router()
const User=require('../models/user')


router.post('/signin',signin)
router.post('/signup',signup)
router.post('/profile',requiredSignin,(req,res)=>{
    res.status(200).json({
        user:"profile"
    })
})


module.exports=router