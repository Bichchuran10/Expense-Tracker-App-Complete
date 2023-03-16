const Razorpay=require('razorpay')
const Order=require('../models/Order')
const jwt=require('jsonwebtoken')
const sequelize=require('../util/database');

// function generateAccessToken(id,name, ispremiumuser){
//     return jwt.sign({userId :id,name:name, ispremiumuser},'secretkey')
// }

const generateAccessToken = (id,name,ispremiumuser)=>{
    return jwt.sign({userId: id, name: name, ispremiumuser}, 'secretkey');
}

const purchasepremium=async(req,res)=>{
    try{
        var rzp=new Razorpay({
            key_id: 'rzp_test_B6jgs4AWMkdtRx',
            key_secret: 'RBgAN5znoCcMgVsjMZxmiylU'
            //process.env.RAZORPAY_KEY_SECRET
        })
       
        const amount=2500;
        rzp.orders.create({amount,currency: "INR"},(err,order)=>{

            if(err){
                console.log(err)
                throw new Error(JSON.stringify(err))
            }
            req.user.createOrder({ orderid: order.id, status: 'PENDING'}).then(()=>{
                return res.status(201).json({order,key_id:rzp.key_id})
            })
            .catch(err=>{
                throw new Error(err)
            })
        })
        
    }
    catch(err)
    {
        console.log(err)
        res.status(403).json({message: 'Something went wrong', error:err})
    }
}

const updateTransactionStatus=async(req,res)=>{
    try{
        const {payment_id,order_id}=req.body;
        const order=await Order.findOne({where: {orderid:order_id}})
        const promise1= order.update({paymentid:payment_id,status:'SUCCESSFUL'})
        const promise2=req.user.update({ispremiumuser:true})

        Promise.all([promise1,promise2]).then(()=>{
            return res.status(202).json({
                success:true,
                message:'Transaction successful',
                token: generateAccessToken(userId,undefined, true)//undefined,undefined,true  //we have to update the token as premiumuser=true to work the refresh just after premium purchase
            });
        }).catch((error)=>{
            throw new Error(error)
        })
    }
    catch(err){
        console.log(err)
        res.status(403).json({
            error:err,
            message:'Something went wrong'
        })
    }
}
module.exports={
    purchasepremium,
    updateTransactionStatus
}