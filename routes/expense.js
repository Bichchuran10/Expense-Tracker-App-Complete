const express=require('express');
const expenseController=require('../controller/expense')
const router=express.Router()
const userauthentication=require('../middleware/auth');

router.post('/add-expense',userauthentication.authenticate,expenseController.addExpense);
router.get('/get-expense',userauthentication.authenticate,expenseController.getExpense);
router.delete('/delete-expense/:id',userauthentication.authenticate,expenseController.deleteExpense);

module.exports=router;