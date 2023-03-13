const Expense=require('../models/Expense');

exports.addExpense=async(req,res,next)=>{

 try{
    const {amount,description,category}=req.body;

    if(amount==undefined || amount.length==0)
    {
        res.send(400).json({success:false, message:'Parameters missing'})
    }

    const data=await Expense.create({amount:amount,description:description,category:category})
    return res.status(201).json({
        expenseDetails:data, 
        success:true
    })
    }
    catch(err)
    {
        return res.status(500).json({
            success:false, error:err
        })
    }
}

exports.getExpense=async(req,res,next)=>{

    try{

        const data=await Expense.findAll()
        return res.status(200).json({
            expenses:data,
            success:true
        })
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            error:err
        })
    }

}

exports.deleteExpense=async(req,res,next)=>{

    try{
    const expenseId=req.params.id
        if(expenseId===undefined || expenseId.length==0)
        {
            return res.status(400).json({
                success:false,
                message:'Missing Parameters'
            })
        }
        await Expense.destroy({where:{ id:expenseId}})
        return res.status(200).json({
            success:true,
            message: 'Expense deleted succesfully'
        })
   }
   catch(err)
   {
        console.log('deletion',err)

        return res.status(500).json({
            success:false,message:'Failed'})
   }
}
