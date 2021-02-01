const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const budget = require('./models/budget.js');


const bankBalance = () => {
    let balance = 0;

    for(let i=0; i<budget.length; i++) {
        balance += parseFloat(budget[i].amount);        
    } 
    // console.log(balance);
    return balance;
}

// const bankBalance = require('./public/bankbalance');

// bankBalance = () => {
//     let balance = 0;
//     for(let i=0; i<budget.length; i++) {
        
//         balance += budget[i].amount;        
//     } 
//     console.log(balance);
//     return balance;
// }

app.get('/ledger',(req,res) => {
    console.log(bankBalance());

    res.render('index.ejs', {
       budgetTable : budget,
       bank : bankBalance(),

    // }, bankBalance(budget, (err, result) => {
    //         if(err) { // Best practice to handle your errors
    //             console.log(err)
    //         } else { // Implement the logic, what you want to do once you recieve the response back 
    //         console.log(result) 

    //         res.render('index.ejs', {
    //             // balance : result,
    //             budgetTable : budget
                
    //         })
    //         }
    //     }),
    
        
    })});

// });


app.get('/new',(req,res) => {
    res.render('new.ejs');
});

app.post("/ledger", (req, res) => {
    budget.push(req.body);
    res.redirect("/ledger");

});

  
app.get('/ledger/:id',(req,res) => {
    res.render('show.ejs', {
        displayEachBudget : budget[req.params.id]
    });
});





app.listen(port, ()=>{
    console.log(`Budgtr app is listening on: ${port}`);
});

// module.exports = bankBal()
