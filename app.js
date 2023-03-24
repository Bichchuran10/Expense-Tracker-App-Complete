const express=require('express')
const path = require('path');
const cors=require('cors');
const bodyParser=require('body-parser');
const sequelize=require('./util/database')
const app=express()
const dotenv = require('dotenv');
const helmet=require('helmet')
const compression=require('compression')
const morgan=require('morgan')

//routers
const userRouter=require('./routes/user.js')
const expenseRouter=require('./routes/expense')
const purchaseRouer=require('./routes/purchase')
const premiumFeatureRouter=require('./routes/premiumFeature')
const forgotPasswordRouter=require('./routes/forgotPassword')
const downloadFilesRoute= require('./routes/allDownload')

//models
const User=require('./models/User');
const Expense=require('./models/Expense');
const Order=require('./models/Order')
const ForgotPassword=require('./models/ForgotPassword')
const DownloadedFile=require('./models/DownloadedFile')

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPassword)
ForgotPassword.belongsTo(User);

User.hasMany(DownloadedFile)
DownloadedFile.belongsTo(User)

// get config vars
dotenv.config();


app.use(cors())
app.use(helmet())
app.use(compression());
app.use(morgan())


//app.use(bodyParser.json({extended: false}))
app.use(bodyParser.json())
app.use(express.json())


app.use('/user',userRouter);
app.use('/expense',expenseRouter);
app.use('/purchase',purchaseRouer);
app.use('/premium',premiumFeatureRouter)
app.use('/password',forgotPasswordRouter);
app.use('/download', downloadFilesRoute)


sequelize
.sync()
//.sync({force:true})
.then((res)=>{
    app.listen(3000)
    //console.log(res)
    console.log('app is running on port 3000')

})
.catch(err=>console.log(err))