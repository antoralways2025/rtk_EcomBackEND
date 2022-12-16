import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const userCntrl =  {

     login:async(req,res)=>{
         try {

            const {email,password}=req.body ;

         if(!email || !password){
            return   res.status(400).json({err:"Please all field are required !"})
         }
            
                 
              const user = await UserModel.findOne({email});
    
                 if(!user) return res.status(400).json({err:"user does not  exits"}) ;

            const isMatch = await  bcrypt.compare(password,user.password)

             if(!isMatch)return res.status(400).json({err:"Email or password doesnot   match!"}) ;

                 const accessToken=createAccessToken({id:user._id}) ;
         

             //   const  refreshToken=createRefreshToken({id:user._id}) ;

               //   res.cookie(String(user._id),accessToken,{
               //      httpOnly:true,
               //      path:'/',
               //      expiresIn:new Date(Date.now()+1000*60) ,
               //      sameSite:'lax',
               //      Credential:true
               //    })

               
                  return res.status(200).json({
                     msg:"Login Success",
                     accessToken,
                    user:{
                        id:user._id,
                       name:user.name,
                       email:user.email,
                       role:user.role,
                       root:user.root,
                       avatar:user.avatar,
                       cart:user.cart

                    }
                  })

         } catch (error) {
            console.log(error)
            return res.status(500).json({err:"Internal Error!"})
         }


     },
    
      register:async(req,res)=>{


        const {name,email,password ,confirmPassword}=req.body ;

        // verify forntend part 
        if(!name  || !email || !password || !confirmPassword){
           
            return  res.status(400).json({err:"Please all field are required !"})
             
        }

        if(password !== confirmPassword){
           return  res.status(400).json({err:"Password DoesNot Match!"})
        }
      

        try {
           
             const user = await UserModel.findOne({email}) ;

            

                if(user){
                    return res.status(400).json({err:"user already   exists"}) ;
                }

           const hassPassword = await  bcrypt.hash(password,10) ;


              const newUser= new UserModel({
                name,
                email,
                password:hassPassword
              })

                        await  newUser.save()

                        return    res.status(200).json({msg:"Registetion Successful! "})

        } catch (error) {
           console.log(error)
           return res.status(500).json({err:"Internal Error!"})
        }
      },
      refreshToken:async(req,res)=>{
        try {
            const rf_token= req.cookies.refreshToken ;


            console.log(rf_token)

             if(!rf_token) return res.status(400).json({msg:"Please login first !"}) ;

               const user =  jwt.verify(rf_token,process.env.REFRESHTOKEN_SECRET) ;


                  if(!user) return res.status(400).json({msg:"Invalid token or expired !"}) ;


                    const accessToken = createAccessToken({id:user.id}) ;

                      res.json({
                        accessToken
                      })
            

        } catch (error) {
            
        }

      },
      getUser:async(req,res)=>{

               const userID = req.params.id;
                
                try {
                   const user = await UserModel.findById({_id:userID},"-password") ; 

                    if(!user) {return res.status(400).json({msg:"User Not found !"}) };

                      return res.status(200).json({user})

                } catch (error) {
                   return res.status(500).json({msg:"Internal Errror!"})
                }
      } ,
      resetPass:async(req,res)=>{
         try {

                 console.log(req.body )
             const {password}=req.body ;
              
              const id = req.id ;

              if(!password){return res.status(400).json({err:"Password not found !"})} 


               const hashPassword = await bcrypt.hash(password,10)

                const  user =  await  UserModel.findByIdAndUpdate(id,{password:hashPassword}) 


                return res.status(200).json({
                  msg:"Password Change Successfully !",
                   
                }) ;

            
         } catch (error) {
             return res.status(500).json({err:"Internal error !"})
         }

      },
      updateInformation:async(req,res)=>{

         try {
            const {name,avatar}=req.body ;

            console.log(req.body)
             
             const id = req.id ;
             
             if(!name || !avatar){return res.status(400).json({err:"We did not find any data !"})} 

             const  user  =  await  UserModel.findByIdAndUpdate(id,{name,avatar}) 


               return res.status(200).json({
                 msg:"User  update Successfully !",
                 user:{
                  id:user._id,
                 name,
                 avatar,
                 email:user.email,
                 role:user.role,
                 root:user.root,
              }
               }) ;

           
        } catch (error) {
          return res.status(500).json({err:"Internal error !"})
        }


      },

      // this is for admin  accesss
      getAllUsers:async(req,res)=>{                       
         try {

          const users=await UserModel.find().select('-password')

           //   if(!user) {return res.status(400).json({msg:"User Not found !"}) };

               return res.status(200).json({users}) ;

         } catch (error) {
            return res.status(500).json({msg:"Internal Errror!"})
         }
     },
      updateUser:  async(req,res)=>{                       
          try {

            const {id}=req.params ;

             const {role}=req.body  ;

              if(!role){return res.status(400).json({err:"I need role to update this User!"})}

           const user =  await UserModel.findByIdAndUpdate({_id:id},{role});

            //   if(!user) {return res.status(400).json({msg:"User Not found !"}) };

                return res.status(200).json({msg:"User Upadate successfully"}) ;

          } catch (error) {
             return res.status(500).json({msg:"Internal Errror!"})
          }
      },
      deleteUser:  async(req,res)=>{                       
         try {
           const {id}= req.params ;
            await UserModel.findByIdAndDelete({_id:id})
            return res.status(200).json({msg:"User delete successfully"}) ;
         } catch (error) {
            return res.status(500).json({msg:"Internal Errror!"})
         }
     }
   
}


export default userCntrl




// genarate JWT_TOKEN 
const createAccessToken=(payload)=>{

      return jwt.sign(payload,process.env.ACCESSTOKEN_SECRET,{expiresIn:'7d'})
}



const createRefreshToken=(payload)=>{

    return jwt.sign(payload,process.env.REFRESHTOKEN_SECRET,{expiresIn:'2h'})
}