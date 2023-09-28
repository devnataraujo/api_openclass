const userModel = require('../models/userModel');

const buscarUsuario = async (request, response) => {
    const users = await userModel.buscarUsuario(request.body);
    return response.status(200).json(users);
};

const cadastrarUsuario = async (request, response) => {
    const cadastrando = await userModel.cadastrarUsuario(request.body);
    //devolver o id do usuario cadastrado e dar request ao body
    return response.status(200).json(cadastrando);
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
    buscarUsuario,
    cadastrarUsuario,
    deletarUsuario,
    //inativarUsuario,
    atualizarInfos,
};

