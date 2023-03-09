const Sequelize=require('sequelize');
const sequelize=new Sequelize('expenseTracker','root','Maina12345',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;
