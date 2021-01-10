const express=require('express')
const { signup, signin } = require('../../controller/admin/auth')
const {validateSignUpRequest,isRequestValidated,validateSignInRequest} = require('../../validators/validators')
const router=express.Router()
const User=require('../../models/user')


router.post('/signin',validateSignInRequest,isRequestValidated,signin)
router.post('/signup',validateSignUpRequest,isRequestValidated,signup)


module.exports=router