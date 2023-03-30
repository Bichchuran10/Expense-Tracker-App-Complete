const userlogin=async(event)=>{
    try{
        event.preventDefault()
        const email=event.target.email.value
        const password=event.target.password.value

        const loginDetails={
            email,
            password
        }
        document.getElementById('loginError').innerHTML = ''

        const response=await axios.post('http://localhost:3000/user/login',loginDetails);
       // http://localhost:3000
    
    
         alert(response.data.message)   
         localStorage.setItem('token',response.data.token)
         window.location.href='../ExpenseTracker/expense.html' //on successful login
    
       
    }
    catch(error)
    {
        console.log(JSON.stringify(error))

        // console.log('helloooooo',error)
        // console.log('helloooooo',error.status)
        console.log("err is",error.data.message)
        document.body.innerHTML+= `<div style="color:red;">${error.data.message}<div>` 
    }
}
function forgotpassword() {
    window.location.href = "../ForgotPassword/forgotPassword.html"
}