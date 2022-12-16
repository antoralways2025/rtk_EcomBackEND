import cloudinary from 'cloudinary';
import express from 'express';
import fs from 'fs';
const router= express.Router() ;


// lets set up cloudinary config
// we will upload image on cloudanary

 

cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY,
    API_SECRET:process.env.API_SECRET 
  });




   
  router.post('/images/upload',(req,res)=>{

      try{

          
        if(!req.files || Object.keys(req.files).length === 0 ){
          return res.status(400).json({err:"No File were uploaded"})
        }
            
      
         const file = req.files.file

         
        // // //   chcek file size

         if(file.size > 1024*1024*2 ){
                 removeTmp(file.tempFilePath)
                 return res.status(400).json({msg:"size too large "})
         }
        // //   chcek file type
         if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'  ){
             removeTmp(file.tempFilePath)
             return res.status(400).json({err:"File format is inccoret "})
         }
        
        //  lets upload

        cloudinary.v2.uploader.upload(file.tempFilePath,{folder:"profileImages"},async(err,result)=>{
            if(err){
              return res.status(400).json({err:"There are something wrong to send images !"})
            };
            removeTmp(file.tempFilePath)
          return  res.json({public_id:result.public_id, url:result.secure_url})
        })

            
    
      } catch (error) {
         console.log(error)
        return res.status(500).json({err:"Interenal Error!"})
        
      }
  })




  const removeTmp=(path)=>{

    fs.unlink(path,(err)=>{
             
       if(err) throw err
    })
  }

export default router ;



