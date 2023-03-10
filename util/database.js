const Sequelize=require('sequelize')
const sequelize=new Sequelize('expenseapp','root','Maina12345',{
    dialect:'mysql',
    host:'localhost'
    
})

module.exports=sequelize;