const User=require('../models/User');
const Expense=require('../models/Expense');
const express=require('express')
const sequelize=require('../util/database')


const getUserLeaderBoard=async(req,res)=>{

    try{
        
        const leaderboardofusers=await User.findAll({
            order:[['totalExpenses','DESC']]
         })                                             

        console.log(leaderboardofusers)               
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