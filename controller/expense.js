const Expense=require('../models/Expense');
const User=require('../models/User')
const sequelize=require('../util/database')
const S3Service=require('../services/S3services')
const UserServices=require('../services/userservices')

  

const addExpense = async(req, res, next) => {
    const t=await sequelize.transaction();
    try{
        const { amount, description, category } = req.body;

    if(amount == undefined || amount.length === 0){
        return res.status(400).json({success: false, message: 'Parameters missing'})
    }

  const expense =  await Expense.create({amount, description, category, userId: req.user.id},{transaction: t})
        const totalExpense = Number(req.user.totalExpenses)+ Number(amount)
        await User.update({
            totalExpenses: totalExpense
        },{
            where : {id: req.user.id},
            transaction: t
        })
            await t.commit();
            res.status(200).json({expense:expense})
    }catch(err){
            await t.rollback();
            return res.status(500).json({success:false, error:err})
    }
}
   

const getExpense=(req,res)=>{

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



const deleteExpense=async(req,res,next)=>{

    try{
    const expenseId=req.params.id
    console.log('expense Id is',expenseId)
    console.log('userId is',req.user.id) 
    console.log(expenseId)
        if(expenseId===undefined || expenseId.length==0)
        {
            return res.status(400).json({
                success:false,
                message:'Missing Parameters'
            })
        }
       // await Expense.destroy({where:{ id:expenseId}})
       //const totalExpense = Number(req.user.totalExpenses)- Number(req.expense.amount)
       const noofrows=await Expense.destroy({where : {id:expenseId,userId:req.user.id}})
     
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





const downloadexpense=async(req,res,next)=>{
    try{

        const expenses=await UserServices.getExpenses(req)
        console.log(expenses)

        const stringifiedExpenses=JSON.stringify(expenses);

        //it should depend upon the userid
        const userId=req.user.id; 

        const filename=`Expense${userId}/${new Date()}.txt`;
        const fileUrl=await S3Service.uploadToS3(stringifiedExpenses,filename)

        console.log(fileUrl)
        res.status(200).json({ fileUrl, success:true})


    }catch(err){
        console.log(err)
        res.status(500).json({fileUrl:'',success:false,err:err})

    }

    
}

module.exports={
    addExpense,
    getExpense,
    deleteExpense,
    downloadexpense
}

