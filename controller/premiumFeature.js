const User=require('../models/User');
const Expense=require('../models/Expense');
const express=require('express')
const sequelize=require('../util/database')



const getUserLeaderBoard=async(req,res)=>{

    try{
        

         const leaderboardofusers=await User.findAll({
            order:[['totalExpenses','DESC']]
         })
                                                                // attributes:['id','name',[sequelize.fn('sum',sequelize.col('expenses.amount')),'total_cost']],
                                                                // include:[
                                                                //     {
                                                                //         model:Expense,
                                                                //         attributes:[]
                                                                //     }
                                                                // ],
                                                                // group:['user.id'],

        console.log(leaderboardofusers)                                                        // order:[['total_cost','DESC']]
        return res.status(200).json(leaderboardofusers)
        //console.log(leaderboardofusers)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json(err)

    }
}

module.exports={
    getUserLeaderBoard
}