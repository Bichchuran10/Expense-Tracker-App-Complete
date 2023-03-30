const userController=require('../controller/user');
const authenticatemiddleware=require('../middleware/auth');
const expenseController=require('../controller/expense')

const express=require('express')
const router=express.Router()

router.post('/signup',userController.signup);
router.post('/login',userController.login);

router.post('/addexpense', authenticatemiddleware.authenticate, expenseController.addExpense);

router.get('/getexpense',authenticatemiddleware.authenticate, expenseController.getExpense);

 router.get('/download', authenticatemiddleware.authenticate, expenseController.downloadexpense);

router.delete('/deleteexpense/:expenseid', authenticatemiddleware.authenticate, expenseController.deleteExpense);



module.exports=router;