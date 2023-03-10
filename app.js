const express=require('express')
const cors=require('cors');
const bodyParser=require('body-parser');
const sequelize=require('./util/database')
const app=express()
const userRouter=require('./routes/user.js')
const expenseRouter=require('./routes/expense')
const User=require('./models/User');
const Expense=require('./models/Expense');

User.hasMany(Expense);
Expense.belongsTo(User);

app.use(cors())
//app.use(bodyParser.json({extended: false}))
app.use(bodyParser.json())
app.use(express.json())
app.use('/user',userRouter);
app.use('/expense',expenseRouter)


sequelize
.sync()
//.sync({force:true})
.then((res)=>{
    app.listen(3000)
    //console.log(res)
    console.log('app is running on port 3000')

})
.catch(err=>console.log(err))