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
       // if(response.status==200)
        //{
         alert(response.data.message)   
         localStorage.setItem('token',response.data.token)
         window.location.href='./expense.html'
        //}
       
    }
    catch(err)
    {
        console.log(JSON.stringify(err))
        document.body.innerHTML+= `<div style="color:red;">${err.message}<div>` 
    }
}
function forgotpassword() {
    window.location.href = "./forgotPassword.html"
}