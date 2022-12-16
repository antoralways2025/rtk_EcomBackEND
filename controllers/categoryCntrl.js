import categoryModel from "../models/categoryModel.js";
import ProductsModel from "../models/productsModel.js";

  const categoryCntrl={
     getCategories:async(req,res)=>{
        try {
                const categories = await categoryModel.find() ;

                 return res.status(200).json({categories})
        } catch (error) { 
             console.log(error)
            return res.status(500).json({err:"Internal Error!"})
            
        }
     },
     postCategory:async(req,res)=>{
        try {
                const {name}=req.body ;

                 if(!name){return res.status(400).json({err:"We need Categrory Name!"})}

                const   isExists  = await categoryModel.findOne({name}) ;

                  if(isExists){return res.status(400).json({err:"This category already Exist in DB!"})} ;


                     const newCategory= categoryModel({
                         name
                     })


                      const category = await newCategory.save()

                     return res.status(200).json({category}) ;

        } catch (error) { 
             console.log(error)
            return res.status(500).json({err:"Internal Error!"})
            
        }
     },
      deleteCategory:async(req,res)=>{
        try {
                const {id}=req.params;

                                    //  check at first is isExits ?

                              const isExits =  await ProductsModel.findOne({category:id}) ;
                              console.log(isExits)

                              if(isExits){
                                 return res.status(400).json({err:"This category has  prodcuts "})
                              }

                 if(!id){return res.status(400).json({err:"I  need  ID to delete this Category!"})}

                      await categoryModel.findByIdAndDelete({_id:id})            

                     return res.status(200).json({msg:" Delete Category Successfully! "}) ;

        } catch (error) { 
             console.log(error)
            return res.status(500).json({err:"Internal Error!"})
            
        }
     },
      updateCategory:async(req,res)=>{
        try {
                const {id}=req.params;
                const {name}=req.body ;

                    if(!name){return res.status(400).json({err:"I  need  Name to Update this Category!"})}
                    if(!id){return res.status(400).json({err:"I  need  ID to Update this Category!"})}

        
                       await categoryModel.findByIdAndUpdate({_id:id},{name})            

                     return res.status(200).json({msg:" update Category Successfully! "}) ;

        } catch (error) { 
             console.log(error)
            return res.status(500).json({err:"Internal Error!"})
            
        }
     }

  }



  export default categoryCntrl