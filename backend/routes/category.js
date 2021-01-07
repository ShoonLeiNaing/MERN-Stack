
const express = require('express');
const { requiredSignin, adminMiddleware } = require('../commonMiddlewares');
const { addCategory,getCategories } = require('../controller/category');
const router = express.Router()

router.post('/create',requiredSignin,adminMiddleware,addCategory)
router.get('/get',getCategories)

module.exports = router;