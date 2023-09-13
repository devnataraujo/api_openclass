const userModel = require('../models/userModel');

const buscarUsuarios = async (_request, response) => {
    const users = await userModel.buscarUsuarios();
    return response.status(200).json(users);
};

const cadastrarUsuario = async (request, response) => {
    const cadastrando = await userModel.cadastrarUsuario(request.body);
    return response.status(201).json(request.body);
};


const deletarUsuario = async (request, response) => {
    const {id} = request.params;

    await userModel.deletarUsuario(id)
    return response.status(204).json()
};

/*const inativarUsuario = async (request, response) => {
    const {id} = request.params;

    await userModel.inativarUsuario(id)
    return response.status(204).json()
};
*/

const atualizarInfos = async (request, response) => {
    const {id} = request.params;
    await userModel.atualizarInfos(id, request.body)
    return response.status(204).json()
};



module.exports = {
    buscarUsuarios,
    cadastrarUsuario,
    deletarUsuario,
    //inativarUsuario,
    atualizarInfos,
};

