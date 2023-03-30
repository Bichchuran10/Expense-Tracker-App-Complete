const jwt=require('jsonwebtoken');
const User=require('../models/User');

const authenticate=(req,res,next)=>{
    try{
        const token=req.header('Authorization');
        console.log(token)
        const user=jwt.verify(token,'secretkey'); //decrypt the token ,get user object
        
        console.log('userId is ',user.userId);
       
        User.findByPk(user.userId).then(user=>{

            req.user=user;
            next();


        })
       

    }
    catch(err)
    {
        console.log('jwt errrrr',err)
        return res.status(401).json({
            success:false,
        })
    }
}

module.exports={
    authenticate
};