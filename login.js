const signup=async(event)=>
{
    try{
        event.preventDefault()
        console.log('hellooo')
        console.log(event.target.email.value)
        let username=event.target.name.value;
        let email=event.target.email.value;
        let password=event.target.password.value;
        console.log('helloo'username)

        const user={
            username,
            email,
            password
        }
        console.log('helloooo',user)
        const response= await axios.post('http://localhost:3000/user/login',user)
        console.log(response)

        if(response.status==201)
        {
            window.location.href="./login.html"
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