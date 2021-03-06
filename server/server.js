require('./config/config')

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const colors = require('colors');

const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());


app.use(require('./rutas/servicios'));


// Conection of Mongoose with Mongo
mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {

    if (err) throw err;

    console.log('Data Base ONLINE'.inverse);
    
});


 
app.listen(process.env.PORT, () => {
    console.log(colors.green('Listening on port', process.env.PORT, '...'));
});