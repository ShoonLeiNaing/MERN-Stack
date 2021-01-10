const express = require('express');
const { requiredSignin, adminMiddleware } = require('../commonMiddlewares');
const { addProduct } = require('../controller/product');
const multer = require('multer')
const shortid=require('shortid')
const router = express.Router()

var storage = multer.diskStorage({
    destination : './uploads',
    filename:function(req,file,cb){
        cb(null,shortid.generate()+'-'+file.originalname)
    }
})
const upload=multer({ storage })

router.post('/addProduct',requiredSignin,adminMiddleware,upload.array('productpicture'),addProduct)


module.exports = router;