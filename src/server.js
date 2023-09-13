const app = require('./app'); //chamando o app
require('dotenv').config(); //chamando o dotenv

const PORT = process.env.PORT || 3000; //criando uma variável para a porta

app.listen(PORT, () => console.log(`O servidor esta rodando na porta ${PORT}`)); //dizendo para o app chamar a porta 