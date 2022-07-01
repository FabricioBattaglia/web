# First project - Banking API
Oddly enough, this project will be very similar to the one I had to develop in golang for my first job as an interview challange (but that time it was developed in Go). This readme file will hold the requirements for the first project and it will also comment on how it goes about it, discussing important points. We will also document our API here (this will be a link soon enough).

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

## Project setup
As discussed before in the previous steps, the project setup is fairly simple and identical to what we have done already. There are two basic commands we need to run to get things going:
```
yarn init
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

