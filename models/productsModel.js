import mongoose from "mongoose";


const  productsSchema= mongoose.Schema({
    
    title:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    images:{
        type:Array,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    checked:{
     type:Boolean,
     default:false
    },
    inStock:{
        type:Number,
        default: 0
    },
    quantity:{
        type:Number,
        default: 1
    },
    sold:{
        type:Number,
        default:0
    }
},
    { timestamps: true }
)




const  ProductsModel= mongoose.models.product || mongoose.model("product",productsSchema) ;

export default ProductsModel