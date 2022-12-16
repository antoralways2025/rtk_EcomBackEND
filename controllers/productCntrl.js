
import ProductsModel from "../models/productsModel.js";



  class APIfeatures {
    constructor(query,queryString){
         this.query=query 
         this.queryString=queryString
         
    }


      // filtering .

       
      filtering(){


           

               let queryObj={...this.queryString} ;
            
               let excludeFields=["page","limit","sort"] 

                      excludeFields.forEach(el=> delete( queryObj[el]) ) ;

                      if(queryObj.category!=='all'){

                              this.query.find({category:queryObj.category })
                      }

                        
                      if(queryObj.search !== 'all'){

                       

                        this.query.find({title:{$regex:queryObj.search}}) ;
                      }
                                         
                    this.query.find()

            return this

      }

      // sorting

      sorting(){

          if(this.queryString.sort){
                  const sortBy=this.queryString.sort.split(",").join(" ")
                 
                 this.query=this.query.sort(sortBy)  
          }else{
             this.query=this.query.sort("-createdAt")
          }

          return this ;
      }


      // pagination

       
    pagenation(){
      const page = this.queryString.page * 1 || 1;

      const limit = this.queryString.limit * 1 || 6 ;

      const skip = (page - 1) * limit;
       this.query   = this.query.skip(skip).limit(limit)

      return this ;
    }

  }


const productCntrl ={
     getProdutes:async(req,res)=>{

           try {                     

                            
                          const    features   =   new APIfeatures(ProductsModel.find(),req.query)
                                  .filtering().sorting().pagenation() 
                                const    products = await features.query ;


                                   let productResult = await ProductsModel.find()

                                    const limit = req.query.limit || 6

                                      let   pages =  Math.ceil(productResult.length / limit)
                                  
    
                              
   return   res.status(200).json({msg:"Data fetch Successfull",products,pages })
           } catch (error) {

             return res.status(500).json({err:"Internal Error!"})
           }

     },
     getProdute:async(req,res)=>{
                       const id =req.params.id

                      try {
                              
                       const product= await ProductsModel.findById({_id:id}) ;
 

                         if(!product){return res.status(400).json({err:"Not found Product !"})}

                            if(product){
                               return  res.status(200).json({product})
                            }

                      } catch (error) {
                     
                        return res.status(500).json({err:"Internal Error!"})
                      }
    },
     createProduct: async(req,res)=>{
             try {
                  const {price,content,description,title ,images,category ,inStock}=req.body ; 
                
         if(!title || !inStock || !price || !content || !description || !category || images.length === 0 ){

   
      return  res.status(400).json({err:"Every field is requried !"})    


       
            }


                 const newProduct =  new ProductsModel({
                  price,content,description,title ,images,category,inStock
                 })

              const product = await newProduct.save() ;

              return  res.status(200).json({msg:"Prodcuts create success!" ,product})
             } catch (error) {
                  
                return res.status(500).json({err:"Internal Error!"})
             }
     },
     deleteProduct:async(req,res)=>{
         try {

             const _id =req.params.id;
              await  ProductsModel.findByIdAndDelete({_id}) ;

               return res.status(200).json({msg:"Product Delete Successfully!"})
         } catch (error) {
          
            return res.status(500).json({err:"Internal Error!"})
         }
     },
     updateProduct:async(req,res)=>{
        try {

            const _id =req.params.id;

        //     const {price,content,description,title ,images,category ,inStock}=req.body ; 
                
        //  if(!title || !inStock || !price || !content || !description || category=== 'all' || images.length === 0 ){

   
        //     return  res.status(400).json({err:"Every field is requried !"})    


       
        //     }
                 


                 const prodcut = await ProductsModel.findByIdAndUpdate({_id},{...req.body})

                 
                             return res.status(201).json({msg:"SuccessFull" , prodcut })
              
        } catch (error) {
            return res.status(500).json({err:"Internal Error!"})
        }
     }
}




export default productCntrl 