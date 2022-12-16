import express from "express";
// import userCntrl from "../controllers/userCntrl.js";
// import auth from '../middlware/auth.js'; 
import productCntrl from "../controllers/productCntrl.js";
import adminAuth from "../middlware/adminAuth.js";
import auth from "../middlware/auth.js";

 const router = express.Router() ;


 router.route('/products')
       .get(productCntrl.getProdutes)
       .post(auth,adminAuth,productCntrl.createProduct) 

       
router.route(`/products/:id`)
       .get(productCntrl.getProdute)
       .delete(auth,adminAuth,productCntrl.deleteProduct)
       .put(auth,adminAuth,productCntrl.updateProduct)


 export default router