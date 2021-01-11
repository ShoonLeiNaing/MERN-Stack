const express=require('express');
const bodyParser=require('body-parser')
// const env = require('dotenv');
const authRoutes = require('../routes/auth')
const adminRoutes = require('../routes/admin/auth')
const categoryRoutes = require('../routes/category')
const cartRoutes = require('../routes/cart')
const productRoutes = require('../routes/product')
const mongoose=require('mongoose')
const app = express();

//middlewares
app.use(bodyParser())
app.use(express.urlencoded())
app.use(express.json())
app.use('/public',express.static('categoryUploads'))
app.use('/api',authRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/product',productRoutes)
app.use('/api/cart',cartRoutes)



mongoose.connect('mongodb+srv://Shoon:Testing123@nodejstesting.hpvsw.mongodb.net/MERN-ecommerce?retryWrites=true&w=majority',
{   
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true,
})
.then(()=>{
console.log('Database connected')
 })
.catch((error)=>{
    console.log(error)
})

//For environment variables
// env.config();


app.get('/',(req,res)=>{
    res.status('200').json({
        message:"Hello From Server"
    })
})

app.post('/data',(req,res)=>{
    res.status('200').json({
        message:req.body
    })
})


app.listen(2000,()=>{
    console.log(`Server is running on port 2000`)
})