const express = require('express')
const router = express.Router()
const {requiredSignin,userMiddleware} = require('../commonMiddlewares')
const { addToCart } = require('../controller/cart')


router.post('/addtocart',requiredSignin,userMiddleware,addToCart)

module.exports = router