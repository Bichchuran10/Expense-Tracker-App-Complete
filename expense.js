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
        let response=await axios.post('http://localhost:3000/expense/add-expense',
        expenseDetails,
        {
            headers: {'Authorization': token}
        });
        console.log(response.data.expenseDetails);

        showNewExpenseToUI(response.data.expenseDetails);
    }
    catch(err)
    {
        document.body.innerHTML+=`<div style="color:red;">${err.message}</div>`
    }
}



window.addEventListener('DOMContentLoaded',async()=>{
    try{
        const token=localStorage.getItem('token')
        let response=await axios.get('http://localhost:3000/expense/get-expense',
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
    await axios.delete(`http://localhost:3000/expense/delete-expense/${id}`,{
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



