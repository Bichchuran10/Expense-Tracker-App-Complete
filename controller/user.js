const User=require('../models/User')

exports.signup=async(req,res,next)=>{
    console.log(req);
    try{
    const {username,email,password}=req.body
    if(isStringInvalid(username)|| isStringInvalid(email) || isStringInvalid(password))
    {
        res.status(400).json({
            message:'err: Something is missing!!'
        })
    }

    await User.create({name:username,email,password})
    res.status(201).json({
        message:'NEW USER CREATED SUCCESSFULLY'
    })
}
catch(e)
{
    console.log(e);
    res.status(500).json(e)
}


}

exports.login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        if(isStringInvalid(email) || isStringInvalid(password))
        {
            res.status(400).json({
                message:'Email or password is missing'
            })
        }
        const user=await User.findAll({where:{email}}); //user with that email
        if(user.length>0)
        {
            console.log('hello',user)
            console.log('hellooo',user[0])
            if(user[0].password===password)
            {
                res.status(201).json({ success: true, message: 'user logged in successfully'})
            }
            else
            {
                return res.status(400).json({success: false, message: "Password is incorrect"})
            }
        }
        else
        {
            return res.status(404).json({success:false,message:"User doesn't exist"})
        }
    }
    catch(e)
    {
    res.status(500).json({success:false,message:e})
    }
}

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



