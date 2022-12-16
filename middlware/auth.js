
import Jwt from "jsonwebtoken";

const auth= (req,res,next)=>{
      // const cookies = req.headers.cookie ;

     const  headers = req.headers[`authorization`]  ;

      

       if(!headers) {return res.status(400).json({err:" Authorization error !"})} 

       const token= headers.split(" ")[1] ;

   //  if(!cookies){ return res.status(400).json({msg:"There is no cookie!"})}
   //   const token= cookies.split("=")[1] ;
        if(!token){return res.status(400).json({err:"No token found !"})}
         Jwt.verify(token,process.env.ACCESSTOKEN_SECRET,(err,user)=>{
            if(err){
                return res.status(400).json({err:"Invalid Token or expired !"})
            }
              req.id= user.id;
            
         }) 

         next()
}

export default auth