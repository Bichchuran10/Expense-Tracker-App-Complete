const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const sequelize=require('./util/database')
const app=express();
const userRoutes=require('./routes/user');


app.use('/user',userRoutes);
app.use(bodyParser.json({extended:false}))
app.use(cors())

sequelize
//.sync()
.sync({force:true})
.then(res=>{

    app.listen(3000)
    console.log('app is running on port 3000')


})
.catch(err=>console.log(err))
    
