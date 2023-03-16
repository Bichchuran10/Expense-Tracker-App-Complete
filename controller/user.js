const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');

function isStringInvalid(string)
{
    if(string.length===0 || string==='undefined')
    {
        return true
    }
    else
    {
        return false
    }
}


const signup=async(req,res,next)=>{
    //console.log(req);
    try{
        const {name,email,password}=req.body
        if(isStringInvalid(name)|| isStringInvalid(email) || isStringInvalid(password))
        {
            res.status(400).json({
                message:'err: Something is missing!!'
            })
        }
        const saltRounds=10 //more salt rounds , more complicated password
        bcrypt.hash(password,saltRounds,async(err,hash)=>{
            console.log('error in signup',err)
            await User.create({name,email,password:hash})
            res.status(201).json({
                message:'NEW USER CREATED SUCCESSFULLY'
            })

        })   
    }
    catch(e)
    {
        console.log(e);
        res.status(500).json(e)
    }
}

function generateAccessToken(id,name, ispremiumuser){
    return jwt.sign({userId :id,name:name, ispremiumuser},'secretkey')
}

const login=async(req,res,next)=>{

    try{
        const {email,password}=req.body;
        if(isStringInvalid(email) || isStringInvalid(password))
        {
            return res.status(400).json({
                message:'Email or password is missing'
            })
        }
        const user=await User.findAll({where:{email}}); //user with that email
        if(user.length>0)
        {
        
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(err)
                {
                    throw new Error('Something went wrong')
                }
            if(result===true)
            {
               return res.status(200).json({ 
                    success: true, 
                    message: 'user logged in successfully',
                    token:generateAccessToken(user[0].id,user[0].name,user[0].ispremiumuser)
            })
            }
            else
            {
                return res.status(400).json({success: false, message: "Password is incorrect"})
            }
            })
        }
        else
        {
            return res.status(404).json({success:false,message:"User doesn't exist"})
        }
    }
    catch(err)
    {
    res.status(500).json({success:false,message:err})
    }
}



module.exports={
    signup,
    login
}


