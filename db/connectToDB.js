import mongoose from 'mongoose';

 


const connectToDB=( )=>{

    const url =process.env.MONGODB_URL || 'mongodb://localhost:27017/rtk_ecommerce' ;

    
    if(!process.env.MONGODB_URL ){

        console.log("There is no Mongodb uri in ENV file.")
    }

if(mongoose.connections[0].readyState){
 console.log("Data already connected")
 return ''
}





mongoose.connect(url,{useNewUrlParser:true,
    useUnifiedTopology:true},(er)=>{
        if(er)  throw er
        console.log("Data coneection succesfuly !")
       return  ''
    })

}


export default connectToDB