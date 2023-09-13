const express = require('express'); //chamando o express
const cors = require('cors'); //chamando o cors
const router = require('./router'); //chamando o router

const app = express(); //instanciando o express


app.use(express.json()); //dizendo para o express que ele deve usar json
app.use(cors()); //liberando acesso a API
app.use(router); //dizendo para o express que ele deve usar o router

module.exports = app; //exportando o app para ser usado em outro arquivo