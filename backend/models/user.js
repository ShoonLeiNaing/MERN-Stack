const mongoose=require('mongoose')
const bcryt=require('bcrypt')

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:20
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:20,
    },
    username:{
        type:String,
        required:true,
        trim:false,
        min:5,
        max:20
    },
    email:{
        type:String,
        required:true,
        trim:false,
        
    },
    hashPassword:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    contactNumber:{
        type:String
    },
    profilePicture:{
        type:String
    }

},{timestamps:true})

userSchema.virtual('password')
.set(function(password){
    this.hashPassword=bcryt.hashSync(password,10)
})

userSchema.methods={
    authenticate:function(password){
        return bcryt.compareSync(password,this.hashPassword)

    }
}

module.exports=mongoose.model('User',userSchema)