const userlogin=async(event)=>{
    try{
        event.preventDefault()
        const email=event.target.email.value
        const password=event.target.password.value

        const userLogin={
            email,
            password
        }

        const response=await axios.post('http://localhost:3000/user/login',userLogin);
        if(response.status==201)
        {
         alert(response.data.message)   
         window.location.href='./login.html'
        }
        else
        {
            throw new Error('failed to login existing user')
        }
    }
    catch(err)
    {
        console.log('error in login',err)
        document.body.innerHTML+= `<div style="color:red;">${err.message}<div>` 
    }
}