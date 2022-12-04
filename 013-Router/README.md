# Router
For organization purposes is good to separate our routes into different files. That is why we will learn how to create router files. Lets say we are creating an online store and we will have routes for the administrators and for users. We can start by creating a folder in our project root called routes. After that we will add a file called admin.js and another file called shop.js. The admin.js file will hold our routes for the administrators while the shop.js file will hold our routes for the users of the online store. 

Inside the files we will use an express function called Router. It will work like this:
```javascript
//this is admin.js
const express = require('express');

const router = express.Router();

/*
here we would add our routes
*/

module.exports = router;
```

Inside the index.js file we would have to import the routes that we are exporting from our router files. It will work like this:
```javascript
const express = require('express');
const app = express();

const adminRoutes = require('./routes/admin'); //have the relative path to the file, we can omit the .js at the end of admin

app.use(adminRoutes);   //this is needed as well to be able to use our routes

//we would have the same process for the shop.js file to handle the consumers routes
//the order that we import our routes does not matter, as long as they are declared before the middlewares
//therefore we should always import and declare the app.use at the top of our code

app.use(express.json());
```