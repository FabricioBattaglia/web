# First project - Banking API
Oddly enough, this project will be very similar to the one I had to develop in golang for my first job as an interview challange (but that time it was developed in Go). This readme file will hold the requirements for the first project and it will also comment on how it goes about it, discussing important points. We will also document our API [here]()

## Project details:
### Requirements:
-   Account creation;
-   Get account's bank statement; 
-   Deposit;
-   Withdrawal;
-   Get account's bank statement by date;
-   Update account information;
-   Fetch account information;
-   Delete an account;

### Rules:
-   There can only be one account per SSN;
-   Deposits can only be done on existing accounts;
-   Statements can only be generated for existing accounts;
-   Withdrawals can only be done on existing accounts;
-   Deletion can only be done to existing accounts;
-   Accounts must have more or equal funds to withdrawal attempt;  
### Account
-   SSN: String
-   Name: String
-   Id: uuid - universally unique id
-   statement: []

## Project setup
As discussed before in the previous steps, the project setup is fairly simple and identical to what we have done already. There are two basic commands we need to run to get things going:
```
yarn init -y
yarn add express
```
After this, we can also add nodemon to make our lives easier:
```
yarn add nodemon -d
```
And to complete nodemon setup we add this script to our package.json:
```json
"scripts": {
    "dev": "nodemon src/index.js"
},
```
REMINDER: add src file that will hold our source code.

Now we can start working on our index.js file. We can use the hello world as a template to start developing:
```javascript
const express = require('express');

const app = express();

app.use(express.json()); //so we can use json

app.listen(4004);
```

Since we will use "uuid" for the account id, we need to add this dependency using yarn:
```
yarn add uuid
```

Now we can tackle creating an account and validating if an account with that same ssn exists:
```javascript
const express = require('express');
const { v4: uuidv4 } = require("uuid") //check versions later

const app = express();

app.use(express.json());

const customers = []; //array of customers

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
})

app.listen(4004);
```
REMINDER: Since we do not have a database, whenever we restart the app we lose all the information! This will not be the case in future projects and in real life projects.

## Middlewares:
Now we are able to create (POST) a new account and check if an account with the same SSN exists! Now off to the next part: Getting the statement for that account. But before we do that we need to wrap our minds around middlewares. Middlewares are functions in express that have access to the request object, the response object, and a function "next()". The next function calls the next middleware in the stack. This is how middlewares work:
```javascript
app.get("/route", middleware1, middleware2, middlewareN, (request, response) => {

});

//and here we declare the middleware
function middleware1(request, response, next) {
    //does whatever it needs us to do
    return next();
}
```
We can also pass middlewares in a different way:
```javascript
app.use(middleware1);
```
This makes that every http request bellow that declaration will use the middleware. The first way declared it means that only that get route will use it. This new way means that EVERY route will use this middleware. All in all, middlewares are functions that are executed between our request and response.

Now that we know more about middlewares, we will use them to check if an account exists while performing some of the functionalities this API allows us to do. Before we create routes that change the statement of an account, we first will add a route to get an account by SSN. That includes the check to see if the account we are looking for exists in the first place. Here is how our project should look for that:
```javascript
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

//app.use(checkAccountExistsBySSN); //we might use this later instead of calling it in every route...

app.get("/statement/", checkAccountExistsBySSN, (request, response) => {
    const { customer } = request; //and this is how we retrieve the customer from the middleware
    return response.json(customer.statement)
});

app.listen(4004);
```
Now we can go on and create a route to add funds to an existing account:
```javascript
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
```

Now we will work on the withdrawal. For that, we will need a function that will get the current balance of the account for us, based on funds added and funds withdrawn:
```javascript
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
```
With this function done, we can create the withdrawal route:
```javascript
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
```
We have adding and removing funds from the account done, as well as the balance calculation. Now we will work on getting the statement. We already have some work done for the statement, but we need to finalize it. Our statement is already retrieved it, but now we need to add a route to get it by date. It will look like this:
```javascript
app.get("/statement/date", checkAccountExistsBySSN, (request, response) => {
    const { customer } = request;
    const { date } = request.query;

    const dateFormat = new Date(date + " 00:00"); //this is so we can find by day and the hour will not be a problem

    //this is to compare the date received with the dates in the statements
    const statement = customer.statement.filter((statement) => statement.created_at.toDateString() === (dateFormat).toDateString());

    return response.json(statement);
});
```

I will take the liberty to add an extra route: check balance. Although we can come with the answer by checking the statement, it is easier if there is a route that simply returns that:
```javascript
app.get("/balance", checkAccountExistsBySSN, (request, response) => {
    const { customer } = request;
    const balance = getBalance(customer.statement)
    return response.status(200).json({funds: balance});
});
```
Now we are very close to the end of this API. We will now tackle fetching, updating, and deleting account information (name).
```javascript
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
```
Wow... this is it! We did it! we have a fully functional API! The source code is inside folder "006-first-project/src"
Also check documentation for the API [here]()

# Source code:
```javascript
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
```