import mongoose from 'mongoose';


const orderSchema= mongoose.Schema({
    
    user:{
        type:mongoose.Types.ObjectId ,
        ref:'user'
    },
    address:String,
    mobile:String,
    cart:Array, 
    total:Number,
    delivered:{
        type:Boolean,
        default:false
    },
    paid:{
        type:Boolean,
        default:false
    },
    paymentId:String,
    method:String,
    paymentOfDate:Date

},
{ timestamps: true }
) ;


const orderModel= mongoose.models.order || mongoose.model('order',orderSchema) ;



export default orderModel ;