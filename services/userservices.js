const getExpenses=(req)=>{
    return req.user.getExpenses({where})
}

module.exports={
    getExpenses
}