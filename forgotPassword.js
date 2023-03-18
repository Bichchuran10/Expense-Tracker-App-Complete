const forgotPassword=async(event)=>{
    try{

        event.preventDefault()
        const form=new FormData(event.target)
        const userDetails={
            email:form.get("email")
        }
    
        console.log('forgot userDetails ',userDetails)
    
        const response=await axios.post('http://localhost:3000/password/forgotpassword',userDetails)
        if(response.status==200)
        {
            document.body.innerHTML+='<div style="color:red;">Mail sent succesfully</div>'
        }
         else 
         {
        throw new Error('Something went wrong !! reset mail could n0t be sent')
        }

    }
    catch(err)
    {
        document.body.innerHTML+=`<div style="color:red;">${err}</div>`
    }
   

}