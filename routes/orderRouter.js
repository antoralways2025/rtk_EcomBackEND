import express from "express";
import orderCntrl from "../controllers/orderCntrl.js";
import auth from "../middlware/auth.js";
 const router= express.Router() ;

//   router.post('/create',auth,orderCntrl.createOrder ) 
  router.route('/orders')
               .get(auth,orderCntrl.getOrders )
               .post(auth,orderCntrl.createOrder )
 
  

router.route(`/orders/:id`)
             .get(auth,orderCntrl.getOrder )
             .patch(auth,orderCntrl.updateOrder)

 export default router