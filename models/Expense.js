const sequelize=require('../util/database');
const Sequelize=require('sequelize');


//creating expense table
const Expense=sequelize.define('expense',{

    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    description:{
        type:Sequelize.STRING, 
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    }

})

module.exports=Expense;