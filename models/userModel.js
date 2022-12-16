import mongoose from 'mongoose';


const userSchema= mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    avatar:{
        type:String,
        default:"https://res.cloudinary.com/dvmnbsdec/image/upload/v1669298622/profileImages/jcarturum8gak8xbdtgu.jpg"
    },
    role:{
        type:String,
        default:"user"
    },
    root:{
        type:Boolean,
        default:false
    }
     
},
    { timestamps: true }
)




const UserModel=mongoose.models.user || mongoose.model("user",userSchema) ;

export default UserModel