const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//import admin router object
const adminRoutes = require('./routes/admin');

//import shop router object
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended:false}));
app.use(adminRoutes);
app.use(shopRoutes);

//catch all middleware at the bottom (thats why 'use') to return a 404 page
app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found!</h1>');
})

app.listen(4004);