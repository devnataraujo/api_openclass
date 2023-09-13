const mysql = require('mysql2/promise'); // chamando o mysql2/promise
require('dotenv').config(); // chamando o dotenv

console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)
console.log(process.env.DB_NAME)

const connection = mysql.createPool(
    {
        host: process.env.DB_HOST, // endereço do servidor
        user: process.env.DB_USER, // usuário do banco de dados
        password: process.env.DB_PASS, // senha do banco de dados
        database: process.env.DB_NAME // nome do banco de dados
    }
); // cria a conexão com o banco de dados



module.exports = connection; // exporta a conexão com o banco de dados