
import UserModel from "../models/userModel.js";

const adminAuth=async (req,res,next)=>{
      // const cookies = req.headers.cookie ;


          const id = req.id ;

           const user = await UserModel.findById({_id:id}) ;




            if(user?.role !== 'admin'){

                 return res.status(400).json({err:"You have to be Admin or Root at frist !"})
            } 

         next()
}

export default adminAuth