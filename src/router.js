const express = require('express'); //chamando o express

const userController = require('./controllers/userController'); //chamando o controller de usuário
const userMiddleware = require('./middlewares/userMiddleware'); //chamando o middleware de usuário
const { route } = require('./app');

const router = express.Router(); //instanciando o router


//router.get('/users', userController.buscarUsuarios); // executando funcao buscarUsuarios do controller de usuário
router.post('/users/login' ,userController.buscarUsuario); // executando funcao buscarUsuario do controller de usuário
router.post('/users/cadastrar', userMiddleware.validateBody ,userController.cadastrarUsuario); // executando funcao  cadastrarUsuario do controller de usuário
router.put('/users/inativar/:id', userMiddleware.verifyJWT ,userController.inativarUsuario ); // executando funcao
router.post('/users/buscar/:id', userMiddleware.verifyJWT ,userController.buscarInfosUsuario ); // executando funcao
router.put('/users/atualizarDocumento', userMiddleware.verifyJWT ,userController.atualizarDocumento ); // executando funcao
router.put('/users/atualizarEmail', userMiddleware.verifyJWT ,userController.atualizarEmail ); // executando funcao
router.put('/users/atualizarSenha', userMiddleware.verifyJWT ,userController.atualizarSenha ); // executando funcao
router.put('/users/atualizarTelefone', userMiddleware.verifyJWT ,userController.atualizarTelefone ); // executando funcao
router.put('/users/atualizarNome', userMiddleware.verifyJWT ,userController.atualizarNome ); // executando funcao
router.put('/users/ativarUser', userMiddleware.verifyJWT ,userController.ativarUser ); // executando funcao
router.post('/labs/criarLaboratorio', userMiddleware.verifyJWT ,userController.criarLaboratorio ); // executando funcao
router.get('/labs/vizualizarLab/:id', userMiddleware.verifyJWT ,userController.vizualizarLab ); // executando funcao
router.get('/labs/vizualizarTodosLabs', userMiddleware.verifyJWT ,userController.vizualizarTodosLabs ); // executando funcao
router.put('/labs/inativarLab', userMiddleware.verifyJWT ,userController.inativarLab ); // executando funcao
router.put('/labs/ativarLab', userMiddleware.verifyJWT ,userController.ativarLab ); // executando funcao

module.exports = router; //exportando o router para ser usado em outro arquivo