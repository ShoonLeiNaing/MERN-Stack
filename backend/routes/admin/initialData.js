const express=require('express')
const { initialData } = require('../../controller/admin/initialData')
const router=express.Router()
const User=require('../../models/user')


router.get('/',initialData)



module.exports=router