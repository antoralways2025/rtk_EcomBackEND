
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
 

import express from 'express';
import fileUpload from 'express-fileupload';
import categoryRouter from './routes/categoryRouter.js';
import orderRouter from './routes/orderRouter.js';
import ProductsRouter from './routes/productRouter.js';
import uploadsRouter from './routes/uploads.js';
import userRouter from './routes/userRouter.js';
const port=process.env.PORT || 9000 ;


import connectToDB from './db/connectToDB.js';

dotenv.config()
const app = express() ;


// connect to  mongodb 
 
   connectToDB()

// middlwares 

app.use(express.json()) ;
app.use(cookieParser());
app.use(cors()) ;
app.use(fileUpload({
    useTempFiles:true
}))
app.use(express.urlencoded({extended:true})) ;

app.use(express.static("../client/build"));



 
 
// default error handler 

app.use((err,req,res,next)=>{

   if (res.headersSent) {
      return next(err)
    }
     if(err){
      return next(err)
     }else{
        res.send("success")
     }
})

app.get('/',(req,res)=>res.json({msg:"Hello World!"}))

// rotues 
app.use('/api',userRouter) ;
app.use('/api',ProductsRouter);
app.use('/api',uploadsRouter) ;
app.use('/api',orderRouter) ;
app.use('/api',categoryRouter);
 


// listerner 
 app.listen(port,()=>console.log(`http://localhost:${port}`))



