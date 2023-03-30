const userlogin=async(event)=>{
    try{
        event.preventDefault()
        const email=event.target.email.value
        const password=event.target.password.value

        const loginDetails={
            email,
            password
        }
    

        const response=await axios.post('http://localhost:3000/user/login',loginDetails);
       // http://localhost:3000
    
        if(response.status=200)
        {
         alert(response.data.message)   
         localStorage.setItem('token',response.data.token)
         window.location.href='../ExpenseTracker/expense.html' //on successful login
        }
    
       
    }
    catch(error)
    {
        console.log(JSON.stringify(error))

        // console.log('helloooooo',error)
        // console.log('helloooooo',error.status)
        document.body.innerHTML+= `<div style="color:red;">${error.data.message}<div>` 
        document.body.innerHTML+= `<div style="color:red;">${error}<div>` 
    }
}
function forgotpassword() {
    window.location.href = "../ForgotPassword/forgotPassword.html"
}