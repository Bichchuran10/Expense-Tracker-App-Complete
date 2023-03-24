const express=require('express');
const path=require('path');
const allDownloadController =require('../controller/allDownload')

const userauthentication=require('../middleware/auth');
const router=express.Router();

router.get('/all', userauthentication.authenticate, allDownloadController.gellAllFiles)

module.exports=router;