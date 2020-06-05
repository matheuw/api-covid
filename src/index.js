const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

/*
mongoose.connect('mongodb+srv://covid:covid19@cluster0-jcd2p.mongodb.net/covid?retryWrites=true&w=majority',
{
     useNewUrlParser: true,
     useUnifiedTopology: true
}
)
*/

try {
     console.log('Connecting to DB');
      mongoose.connect('mongodb+srv://covid:covid19@cluster0-jcd2p.mongodb.net/covid?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
 } catch (error) {
     console.log('mongoose connection error', error);
 }
 
 mongoose.connection.on('connected', () => {
     console.log('connected');
 });
 mongoose.connection.on('error', () => {
     console.log('connect error');
 });
 mongoose.connection.once('open', function() {
     mongoose.connection.db.stats(function(err, stats) {
         console.log(stats);
     });
 });

app.use(express.json());
app.use(routes);
app.listen(3333);


