const signup=async(event)=>
{
    try{
        event.preventDefault()
        let username=event.target.name.value;
        let email=event.target.email.value;
        let password=event.target.password.value;

        const user={
            username,
            email,
            password
        }
        console.log(user)
        const response=await axios.post('http://localhost:4000/user/signup',user)

        if(response.status==201)
        {
            window.location.href="../login/login.html"
        }
        else
        {
            throw new Error('Login failed');
        }

    }
    catch(err)
    {
        console.log('post req failed',err);
        document.body.innerHTML+=`<div style="color:red;">${err}</div>`;
    }
}