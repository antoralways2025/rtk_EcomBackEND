import express from "express";
import categoryCntrl from "../controllers/categoryCntrl.js";
import adminAuth from "../middlware/adminAuth.js";
import auth from "../middlware/auth.js";
 const router = express.Router(); 



 router.route("/categories")
       .get(categoryCntrl.getCategories)
       .post(auth,adminAuth, categoryCntrl.postCategory)

    //    router.route(`/orders/:id`)
    //    .get(auth,orderCntrl.getOrder )

 router.route(`/categories/:id`) 
             .patch(auth,adminAuth, categoryCntrl.updateCategory)
             .delete(auth,adminAuth, categoryCntrl.deleteCategory)

            

  export default router