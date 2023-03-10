const Expense=require('../models/Expense');

exports.addExpense=async(req,res,next)=>{

 try{
    const {amount,description,category}=req.body;

    if(amount==undefined || amount.length==0)
    {
        res.send(400).json({success:false, message:'Parameters missing'})
    }

    const data=await Expense.create({amount:amount,description:description,category:category,userId:req.user.id})
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

exports.getExpense=async(req,res)=>{
    // try{
    //         //const data=await Expense.findAll({where :{userId: req.user.id}})
    //        // return res.status(200).jsonn({ expenses:data,success:true})

    // }

        //const data=await req.user.getExpense()
        // return res.status(200).json({
        //     expenses:data,
        //     success:true
        // })
        req.user.getExpenses().then(expenses=> {
            return res.status(200).json({expenses, success:true})
        })
    .catch(err=>{
        return res.status(500).json({
            success:false,
            error:err
        })
    });
}



exports.deleteExpense=async(req,res,next)=>{

    try{
    const expenseId=req.params.id
    console.log(expenseId)
        if(expenseId===undefined || expenseId.length==0)
        {
            return res.status(400).json({
                success:false,
                message:'Missing Parameters'
            })
        }
       // await Expense.destroy({where:{ id:expenseId}})
       const noofrows=await Expense.destroy({where : {id:expenseId}})
       if(noofrows===0)
       {
            return res.status(404).json({
                success:false,
                message:"Expense doesn't belong to the user"
            })
        }
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
