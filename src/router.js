const express = require('express'); //chamando o express

const userController = require('./controllers/userController'); //chamando o controller de usuário
const userMiddleware = require('./middlewares/userMiddleware'); //chamando o middleware de usuário
const { route } = require('./app');

const router = express.Router(); //instanciando o router


router.get('/users', userController.buscarUsuarios); // executando funcao buscarUsuarios do controller de usuário
router.post('/users', userMiddleware.validateBody ,userController.cadastrarUsuario); // executando funcao  cadastrarUsuario do controller de usuário
router.delete('/users/:id', userController.deletarUsuario ); // executando funcao 
//router.put('/users/:id', userController.inativarUsuario ); // executando funcao
router.put('/users/:id', userMiddleware.validateFieldEmail ,userController.atualizarInfos ); // executando funcao

module.exports = router; //exportando o router para ser usado em outro arquivo