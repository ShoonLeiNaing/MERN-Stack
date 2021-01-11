
const express = require('express');
const { requiredSignin, adminMiddleware } = require('../commonMiddlewares');
const { addCategory,getCategories } = require('../controller/category');
const multer = require('multer')
const shortid = require('shortid')
const router = express.Router()

var storage = multer.diskStorage({
    destination: './categoryUploads',
    filename : function(req,file,cb){
        cb(null,shortid.generate()+'-'+file.originalname)
    }
})
const upload=multer({ storage })
router.post('/create',requiredSignin,adminMiddleware,upload.single('categoryimage'),addCategory)
router.get('/get',getCategories)

module.exports = router;