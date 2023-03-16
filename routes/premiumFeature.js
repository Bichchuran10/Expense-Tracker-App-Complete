const express=require('express');
const router=express.Router()

const premiumFeatureController=require('../controller/premiumFeature');
const userauthentication=require('../middleware/auth');

router.get('/showLeaderBoard',userauthentication.authenticate,premiumFeatureController.getUserLeaderBoard)

module.exports=router;