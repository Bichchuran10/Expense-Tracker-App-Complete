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
        if(response.status==201)
        {
         alert(response.data.message)   
         window.location.href='./login.html'
        }
       
    }
    catch(err)
    {
        console.log(JSON.stringify(err))
        document.body.innerHTML+= `<div style="color:red;">${err.message}<div>` 
    }
}