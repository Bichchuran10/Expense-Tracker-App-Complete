const Expense=require('../models/Expense');
const User=require('../models/User')
const sequelize=require('../util/database')
const S3Service=require('../services/S3services')
const UserServices=require('../services/userservices')
const DownloadedFile=require('../models/DownloadedFile')

  

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
    //const page= +req.query.page|| 1;
    const ITEMS_PER_PAGE=4;
    const page= +req.query.page
    console.log("page controller",page)
    let totalItems;
    let lastPage;

        req.user.getExpenses({
            offset: (page-1) * ITEMS_PER_PAGE,
            limit:ITEMS_PER_PAGE
         })
         //.then(expenses=> {
        //     return res.status(200).json({expenses:expenses, success:true})
        .then(async (limitedExpenses) => {
            // res.status(200).json(limitedExpenses);
            console.log('limited expenses----->', limitedExpenses);
            totalItems = await Expense.count({where: {userId: req.user.id}});

            lastPage = Math.ceil(totalItems / ITEMS_PER_PAGE);
            if(lastPage === 0) {
                lastPage = 1;
            }

            res.status(200).json({
                expenses: limitedExpenses,
                totalExpenses: totalItems,
                currentPage: page,
                hasNextPage: (page*ITEMS_PER_PAGE) < totalItems,
                hasPreviousPage: page > 1,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: lastPage
            })
        })   
    .catch(err=>{
        return res.status(500).json({
            success:false,
            error:err
        })
    });
}



const deleteExpense=async(req,res,next)=>{

    try {
        const deleteId = req.params.id
        const amount = req.query.amount
        console.log(" query amount",amount)
        console.log("for deleteeeeeee",deleteId)
        
        let totalExpenseAmount = await User.findByPk(req.user.id, {
            attributes: ['totalExpenses']
        })
         
        totalExpenseAmount.totalExpenses -= parseInt(amount)
        
        const p1 =  User.update({totalExpenses: totalExpenseAmount.totalExpenses}, {where: {id: req.user.id}})
        const p2 = Expense.destroy({where: {id: deleteId}})
        const response = await Promise.all([p1, p2])
        res.json({response})
    } catch (error) {
        console.log(error)
    }
}





const downloadexpense=async(req,res,next)=>{
    try{

        const expenses=await UserServices.getExpenses(req)
        console.log(expenses)

        const stringifiedExpenses=JSON.stringify(expenses);

        //it should depend upon the userid
        const userId=req.user.id; 
        console.log("in download userId",userId)

        const filename=`Expense${userId}/${new Date()}.txt`;
        const fileUrl=await S3Service.uploadToS3(stringifiedExpenses,filename)

        console.log(fileUrl)

        DownloadedFile.create({
            url:fileUrl,
            userId:req.user.id
        })
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