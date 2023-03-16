const Expense=require('../models/Expense');
const User=require('../models/User')
const sequelize=require('../util/database')

exports.addExpense=async(req,res,next)=>{

    const {amount,description,category}=req.body;

    if(amount==undefined || amount.length==0)
    {
        res.send(400).json({success:false, message:'Parameters missing'})
    }

    Expense.create({amount,description,category,userId:req.user.id}).then(expense=>{
        const totalExpense=Number(req.user.totalExpenses)+Number(amount)
        console.log('your total expense is',totalExpense);

        User.update({
            totalExpenses:totalExpense
        },{
            where:{id:req.user.id}
        }).then(async()=>{
            res.status(200).json({expense:expense})
        })
        .catch(async(err)=>{
            return res.status(500).json({success:false,error:err})
        })

    }).catch(async(err)=>{
        return res.status(500).json({success:false,error:err})
    })
 }

// exports.addExpense = async(req, res, next) => {
//     try{
//         const { amount, description, category } = req.body;

//     if(amount == undefined || amount.length === 0){
//         return res.status(400).json({success: false, message: 'Parameters missing'})
//     }

//   const expense =  Expense.create({amount, description, category, userId: req.user.id})
//         const totalExpense = Number(req.user.totalExpenses)+ Number(amount)
//         await User.update({
//             totalExpenses: totalExpense
//         },{
//             where : {id: req.user.id},
//         })
//             res.status(200).json({expense:expense})
//     }catch(err){
//             return res.status(500).json({success:false, error:err})
//     }
// }
  
   

exports.getExpense=(req,res)=>{

        req.user.getExpenses().then(expenses=> {
            return res.status(200).json({expenses:expenses, success:true})
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

