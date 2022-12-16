import express from "express";
import userCntrl from "../controllers/userCntrl.js";
import adminAuth from "../middlware/adminAuth.js";
import auth from '../middlware/auth.js';
 const router= express.Router() ;

  router.post('/user/login',userCntrl.login)
  router.post('/user/register',userCntrl.register)
  router.get('/user/refresh_token',userCntrl.refreshToken)  
//  router.get('/user/get',auth, userCntrl.getUser)
// router.get('/user',user)
  router.patch('/user/resetPassword',auth,userCntrl.resetPass)
  router.patch('/user/updateInfo',auth, userCntrl.updateInformation) 


// dynamic route  and just admin access 

router.get('/users',auth,adminAuth,userCntrl.getAllUsers)

 router.route('/users/:id')
    //    .get(auth,userCntrl.getUser)
        .get(auth,userCntrl.getUser)
       .patch(auth,userCntrl.updateUser)
       .delete(auth,adminAuth,userCntrl.deleteUser)
       
 


 export default router