const express = require('express');

const resetpasswordController = require('../controller/resetpassword');


const router = express.Router();


router.post('/forgotpassword', resetpasswordController.forgotPassword)

router.get('/resetpassword/:id', resetpasswordController.resetPassword)

router.get('/updatepassword/:id', resetpasswordController.updatePassword)




module.exports = router;