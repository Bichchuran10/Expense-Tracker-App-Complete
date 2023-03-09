const User=require('../models/user');

function isStringInvalid(string)
{
    if(string.length===0 || string=='undefined')
    {
        return true
    }
    else
    {
        return false
    }
}


exports.signup=async(req,res,next)=>{
    try{
        const {name,email,password}=req.body;
        if(isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(password))
        {
            return res.status(404).json({
                err: 'Something is missing here'
            })
        }
        await User.create({name,email,password})
        res.status(201).json({
            message: 'New user successfully created'
        })
    }
    catch(e)
    {
        res.status(500).json(e)
    }
}