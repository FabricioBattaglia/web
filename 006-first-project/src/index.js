const { request, response } = require('express');
const express = require('express');
const { v4: uuidv4 } = require("uuid") //check versions later

const app = express();

app.use(express.json());

const customers = []; //array of customers

//Middleware function
function checkAccountExistsBySSN(request, response, next) { 
    const { ssn } = request.headers;
    const customer = customers.find((customer) => customer.ssn === ssn);
    if(!customer) {
        return response.status(404).json({error: "Customer not found!"})
    }
    request.customer = customer; //this makes so that every request that calls this function will have access to the customer
    return next();
}

function getBalance(statement) {
    //acc = accumulator: variable that holds the resulting amount
    const balance = statement.reduce((acc, operation) => { //reduce basically does the math for us
        if(operation.type === 'add funds'){
            return acc + operation.amount;
        } else {
            return acc - operation.amount;
        }
    }, 0);  //this 0 is the value that reduced is started at
    return balance
}

app.post("/account", (request, response) => {
    const { ssn, name } = request.body;
    const custExists = customers.some((customer) => customer.ssn === ssn); // === compares data type and value

    if(custExists){
        return response.status(400).json({error: "Customer already exists"})
    }

    customers.push({
        ssn,
        name,
        id: uuidv4(), //generating new uuid v4
        statement: []
    });
    return response.status(201).send();
});

//app.use(checkAccountExistsBySSN);

app.get("/statement", checkAccountExistsBySSN, (request, response) => {
    const { customer } = request; //and this is how we retrieve the customer from the middleware
    return response.json(customer.statement);
});

app.get("/statement/date", checkAccountExistsBySSN, (request, response) => {
    const { customer } = request;
    const { date } = request.query;

    const dateFormat = new Date(date + " 00:00"); //this is so we can find by day and the hour will not be a problem

    //this is to compare the date received with the dates in the statements
    const statement = customer.statement.filter((statement) => statement.created_at.toDateString() === (dateFormat).toDateString());

    return response.json(statement);
});

app.get("/balance", checkAccountExistsBySSN, (request, response) => {
    const { customer } = request;
    const balance = getBalance(customer.statement)
    return response.status(200).json({funds: balance});
});

app.post("/deposit", checkAccountExistsBySSN, (request, response) => {
    const { description, amount } = request.body;
    const { customer } = request;
    const operation = {
        description,
        amount,
        created_at: new Date(),
        type: "add funds"
    }

    customer.statement.push(operation);

    return response.status(201).send();
});

app.post("/withdrawal", checkAccountExistsBySSN, (request, response) => {
    const { amount, } = request.body;
    const { customer } = request;

    const balance = getBalance(customer.statement);
    
    if(balance < amount) {
        return response.status(400).json({error: "Insufficient funds!"});
    }
    
    const operation = {
        amount,
        created_at: new Date(),
        type: "remove funds",
    };

    customer.statement.push(operation);

    return response.status(201).send();
});

app.put("/account", checkAccountExistsBySSN, (request, response) => {
    const { name } = request.body;
    const { customer } = request;

    customer.name = name;
    return response.status(201).send();
});

app.get("/account", checkAccountExistsBySSN, (request, response) => {
    const { customer } = request;
    return response.json(customer);
});

app.delete("/account", checkAccountExistsBySSN, (request, response) => {
    const { customer } = request;
    //for this we will use JS splice function
    //splice takes 2 parameters, what to remove, until where to remove
    //since we only want one customer, it will be: splice(customer, 1)
    customers.splice(customer, 1);
    return response.status(200).send();
});

app.listen(4004);