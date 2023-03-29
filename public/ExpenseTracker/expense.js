const save=async(event)=>{
    try{
        event.preventDefault();

        const amount=event.target.amount.value;
        const description=event.target.description.value;
        const category=event.target.category.value;

        const expenseDetails={
            amount,
            description,
            category
        }
        console.log(expenseDetails)
        const token=localStorage.getItem('token')
        let response=await axios.post('http://18.209.227.96:3000/expense/add-expense',
        expenseDetails,
        {
            headers: {'Authorization': token}
        });
        console.log('the response',response)
        console.log('your data',response.data.expense)
        

        //showNewExpenseToUI(response.data.expenseDetails);
        showNewExpenseToUI(response.data.expense);
    }
    catch(err)
    {
        document.body.innerHTML+=`<div style="color:red;">${err.message}</div>`
    }
}



window.addEventListener('DOMContentLoaded',async()=>{
    try{
        //const page=1;
        const token=localStorage.getItem('token')
        const decodeToken=parseJwt(token)
        console.log('decoded token isss ',decodeToken)
        const ispremiumuser=decodeToken.ispremiumuser
        if(ispremiumuser)
        {
            showPremiumUserMessage()
            showLeaderboard()
        }
        let response=await axios.get(`http://18.209.227.96:3000/expense/get-expense`, //?page=${page}
        {
            headers:{'Authorization':token}
        })
        
        //console.log(response.data.expenses)

        // response.data.expenses.forEach(expense => {
        //     showNewExpenseToUI(expense)
        //     console.log('final',expense)
            
        // });
        for(let i=0;i<response.data.expenses.length;i++)
        {
            showNewExpenseToUI(response.data.expenses[i])
            
            //console.log(response.data.expenses[i])
        }
        //showPagination(response.data)
        }
    catch(e)
    {
        console.log('errrrrr',e)
    }
})

const showNewExpenseToUI=(expenseDetails)=>
{
    const parentNode=document.getElementById('listOfExpenses')
    const childHTML=`<li id=${expenseDetails.id}> Expense Amount : ${expenseDetails.amount} - Expense Description : ${expenseDetails.description} - Expense Category : ${expenseDetails.category}
                    <button onclick=deleteExpense(${expenseDetails.id})>Delete</button> </li>`
    
        
    parentNode.innerHTML=parentNode.innerHTML+childHTML

}


const deleteExpense=async(id)=>{

    try{
        const token=localStorage.getItem('token')
    await axios.delete(`http://18.209.227.96:3000/expense/delete-expense/${id}`,{
        headers:{'Authorization':token}
    })
    console.log(`expense with this id ${id} has been deleted from database`)
    deleteExpenseFromUI(id)
    }
    catch(err)
    {
        console.log('error in deletion from database',err)
    }
}

const deleteExpenseFromUI=(id)=>{
    try{
        const parentNode=document.getElementById('listOfExpenses');
        const childNodeToBeDeleted=document.getElementById(id)

        parentNode.removeChild(childNodeToBeDeleted)
    }
    catch(e)
    {
        console.log('error in deletion from UI',err)
    }
}


document.getElementById('rzp-button1').onclick=async function(event){
    const token=localStorage.getItem('token')
    const response=await axios.get('http://18.209.227.96:3000/purchase/premiummembership',{
        headers:{'Authorization':token}
    })
    console.log(response)
    var options={
        "key":response.data.key_id, //enter the keyId generated from the dashboard
        "order_id":response.data.order.id, //for one time payment

        //to handle success payments
        "handler": async function(response){

            const res=await axios.post('http://18.209.227.96:3000/purchase/updatetransactionstatus',{
                order_id: options.order_id,
                payment_id:response.razorpay_payment_id,
        },
        {
            headers:{'Authorization':token}
        })

        alert('You are a premium user now')
        
        document.getElementById('rzp-button1').style.visibility = "hidden"
        
        showPremiumUserMessage()
        localStorage.setItem('token', res.data.token)
        showLeaderboard()
        }
    };
    const rzp1= new Razorpay(options);
    rzp1.open()
    event.preventDefault()

    rzp1.on('payment.failed',function(response){
        console.log(response)
        alert('Something went wrong')
    });

}


function showPremiumUserMessage()
{
    document.getElementById('rzp-button1').style.visibility='hidden'
    document.getElementById('message').innerHTML='You are a premium user'
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


function showLeaderboard(){
    const inputElement=document.createElement('input');
    inputElement.type='button'
    inputElement.value='Show Leaderboard'

    inputElement.onclick=async()=>{
        const token=localStorage.getItem('token')
        const userLeaderBoardArray = await axios.get('http://18.209.227.96:3000/premium/showLeaderBoard',
         { headers: {'Authorization': token} })
        console.log('here is your leaderboard',userLeaderBoardArray)

        var leaderboardElem=document.getElementById('leaderboard')
        console.log(leaderboardElem);

        leaderboardElem.innerHTML+='<h1> Leaderboard</h1>'
        userLeaderBoardArray.data.forEach((userDetails) => {
            leaderboardElem.innerHTML+=`<li>Name : ${userDetails.name} Total Expenses : ${userDetails.totalExpenses}</li>`
        });
    }
    document.getElementById('message').appendChild(inputElement)
}

const download=()=>{
    const token = localStorage.getItem('token')
    axios.get('http://18.209.227.96:3000/user/download', { headers: {"Authorization" : token} })
    .then((response) => {

            //backend is essentially sending a download link,which if we open
            //in browser , the file would be downloaded
        if(response.status === 200){
            var a = document.createElement("a");
            a.href = response.data.fileUrl;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
        }
    })
    .catch((err) => {
        console.log(err)
    });
}


// const pagination=document.getElementById('pagination');
// function showPagination({
//     currentPage,
//     hasNextPage,
//     hasPreviousPage,
//     nextPage,
//     previousPage
// }){
//     pagination.innerHTML="";

//     if(hasPreviousPage){
//         const btn2=document.createElement('button');
//         btn2.innerHTML=previousPage;
//         btn2.addEventListener('click',()=> getExpenses(previousPage));
//         pagination.appendChild(btn2)
//     }

//     const btn1=document.createElement('button');
//     btn1.innerHTML=currentPage;
//     btn1.addEventListener('click',()=> getExpenses(currentPage));
//     pagination.appendChild(btn1)

//     if(hasNextPage){
//         const btn3=document.createElement('button');
//         btn3.innerHTML=nextPage;
//         btn3.addEventListener('click',()=>getExpenses(nextPage));
//         pagination.appendChild(btn3)
//     }
// }