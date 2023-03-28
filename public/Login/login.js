const userlogin=async(event)=>{
    try{
        event.preventDefault()
        const email=event.target.email.value
        const password=event.target.password.value

        const loginDetails={
            email,
            password
        }

        const response=await axios.post('http://18.209.227.96:3000/user/login',loginDetails);
       // http://18.209.227.96:3000
    
       // if(response.status==200)
        //{
         alert(response.data.message)   
         localStorage.setItem('token',response.data.token)
         window.location.href='../ExpenseTracker/expense.html' //on successful login
        //}
       
    }
    catch(err)
    {
        console.log(JSON.stringify(err))
        document.body.innerHTML+= `<div style="color:red;">${err.message}<div>` 
    }
}
function forgotpassword() {
    window.location.href = "../ForgotPassword/forgotPassword.html"
}