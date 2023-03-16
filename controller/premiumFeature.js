const User=require('../models/User');
const Expense=require('../models/Expense');



const getUserLeaderboard=async(req,res)=>{

    try{

        const users=await User.findAll()
        const expenses=await Expense.findAll()

        const userAggregatedExpenses={}
        console.log(expenses)

        expenses.forEach((expense) => {

            if(userAggregatedExpenses[expense.userId]){
                userAggregatedExpenses[expense.userId]=userAggregatedExpenses[expense.userId] + expense.amount;

            }
            else{
                userAggregatedExpenses[expense.userId]=expense.amount
            }
            
        });

        var userLeaderBoardDetails=[];
        users.forEach((user)=>{
            userLeaderBoardDetails.push({name:user.name,total_cost:userAggregatedExpenses[user.id]||0})
        })
        userLeaderBoardDetails.sort((a,b)=>b.total_cost-a.total_cost)
        res.status(200).json(userLeaderBoardDetails)
        console.log(userLeaderBoardDetails)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json(err)

    }
}

module.exports={
    getUserLeaderboard
}