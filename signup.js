const login=async(event)=>{
    try{
        event.preventDefault()
        const username=event.target.name.value;
        const email=event.target.email.value;
        const password=event.target.password.value;

        const user={
            username,
            email,
            password
        }

        console.log('helloo',user);
        let response=await axios.post('http://localhost:3000/user/signup',user)
        console.log('here is your response',response.data)
        if(response.status==201)
        {
        alert(response.data.message)
        window.location.href ='./signup.html'
        }
        else
        {
            throw new Error('Failed to login')
        }

    }
    catch(err)
    {
        console.log('errorrr',err)
        document.body.innerHTML+= `<div style="color:red;">User already exist<div>` 
    }

}