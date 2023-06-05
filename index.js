const express = require('express');
const app = express();
const mongoose = require('mongoose');

const routesB = require('./routes/booksr');
const routesU = require('./routes/userr')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/', routesB)
app.use('/', routesU)

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://bernardolimaa:FTUx25eql0i3Ow9W@cluster0.ah4msrl.mongodb.net/?retryWrites=true&w=majority');
        console.log('Conectado ao banco de dados');
    }
    catch(error){
        console.log(error)
    }
}


app.listen(3000, () => {
    console.log('Conectado ao servidor')
    connect()
})