import orderModel from "../models/orderModels.js";
import ProductsModel from '../models/productsModel.js';
import UserModel from "../models/userModel.js";

const orderCntrl={
   createOrder:async(req,res)=>{
      try {

        // we got   from middlware 
          const id = req.id ;


          const { address,mobile,total ,cart,}=req.body ;

           if(!address || !mobile || !total || !cart){
            return res.status(400).json({err:" Require all field "}); 
           }
           
          //
           cart.filter(item=>{
            sold(item._id,item.quantity,item.sold,item.inStock)
           })


             const newOrder = orderModel({
                  user:id,
                  address,
                  mobile,
                  total,
                  cart
             })



         const order =  await newOrder.save() ;
        return res.status(201).json({msg:" Order success! " ,order})


      } catch (error) { 

                 console.log(error)
        return res.status(500).json({err:"Internal Error!"})

        
      }
   },
   getOrders:async(req,res)=>{
    try {

      // we got   from middlware 
        const id = req.id ;
           const user =   await UserModel.findById(id) ;

            let orders;

            if(user.role  !== 'admin'){

                 orders = await orderModel.find({user:id}).populate('user',"-password")

            }
            else{
              orders = await orderModel.find().populate('user',"-password")
            }

 

             return res.status(200).json({ orders})
     

    } catch (error) { 
   
     return res.status(500).json({err:"Internal Error!"})

      
    }
   },
   getOrder:async(req,res)=>{
    try {
                 // we got   from  param 
                 const id =req.params.id
                  console.log(id)
                const   order = await orderModel.findById({_id:id}).populate('user',"-password")

                 return res.status(200).json({ order})
     

    } catch (error) { 
   
              console.log(error)

     return res.status(500).json({err:"Internal Error!3"})

      
    }
   },
   updateOrder:async(req,res)=>{
    try {

                 const {id}=req.params 
                 
       await orderModel.findByIdAndUpdate({_id:id},{...req.body})

         return res.status(200).json({msg:"Deliver Succesfully !"})

      
    } catch (error) {
      console.log(error)
      return res.status(500).json({err:"This is Interner issue."})
      
    }
   }


}




const sold = async (id,quantity,oldSold,oldInstock)=>{

             await ProductsModel.findByIdAndUpdate({_id:id},{

               sold:quantity + oldSold,
               inStock:oldInstock - quantity


             })
}




// const sold =async(id,quantity,oldInstock,oldSold)=>{

//   await ProductModel.findByIdAndUpdate({_id:id},{

//     inStock:oldInstock - quantity,
//     sold :quantity + oldSold

//   })



// }
export default orderCntrl ;