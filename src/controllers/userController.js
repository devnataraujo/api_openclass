const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
//chamar arquivo env
require('dotenv').config();

const buscarUsuario = async (request, response) => {
    const users = await userModel.buscarUsuario(request.body);
    //verficar se o usuario existe
    if(users.length == 0){
        return response.status(404).json({message: "Usuário não encontrado!"})
    }else{
        if(users[0].flag_active == 0){
            return response.status(401).json({message: "Usuário inativo!"})
        }else{
            //gerar o token
            const token = jwt.sign({id_user: users[0].id_user, user_name: users[0].user_name, fk_user_type: users[0].fk_user_type}, process.env.JWT_KEY, {expiresIn: '1h'});
            return response.status(200).json({message: "Usuário encontrado!", token: token})
        }
    }
};

const cadastrarUsuario = async (request, response) => {
    const cadastrando = await userModel.cadastrarUsuario(request.body);
    //devolver o id do usuario cadastrado e dar request ao body
    return response.status(200).json({message: "Cadastrado com sucesso!", cadastrando});
};


const inativarUsuario = async (request, response) => {
    const {id} = request.params;
    await userModel.inativarUsuario(id)
    return response.status(204).json()
};


const buscarInfosUsuario = async (request, response) => {
    const {id} = request.params;
    const usuario = await userModel.buscarInfosUsuario(id)
    return response.status(200).json(usuario)
};  


const atualizarDocumento = async (request, response) => {
    const infos = request.body;
    const atualizando = await userModel.atualizarDocumento(infos);
    return response.status(200).json({message: "Atualizado com sucesso!", atualizando});
}

const atualizarEmail = async (request, response) => {
    const infos = request.body;
    const atualizando = await userModel.atualizarEmail(infos);
    return response.status(200).json({message: "Atualizado com sucesso!", atualizando});
}

const atualizarSenha = async (request, response) => {
    const infos = request.body;
    const atualizando = await userModel.atualizarSenha(infos);
    return response.status(200).json({message: "Atualizado com sucesso!", atualizando});
}

const atualizarTelefone = async (request, response) => {
    const infos = request.body;
    const atualizando = await userModel.atualizarTelefone(infos);
    return response.status(200).json({message: "Atualizado com sucesso!", atualizando});
}

const atualizarNome = async (request, response) => {
    const infos = request.body;
    const atualizando = await userModel.atualizarNome(infos);
    return response.status(200).json({message: "Atualizado com sucesso!", atualizando});
}

const ativarUser = async (request, response) => {
    const infos = request.body;
    const ativando = await userModel.ativarUser(infos);
    return response.status(200).json({message: "Ativado com sucesso!", ativando});
}

const criarLaboratorio = async (request, response) => {
    const infos = request.body;
    const criando = await userModel.criarLaboratorio(infos);
    return response.status(200).json({message: "Laboratório criado com sucesso!", criando});
}

const vizualizarLab = async (request, response) => {
    const {id} = request.params;
    const labs = await userModel.vizualizarLab(id)
    return response.status(200).json(labs)
};

const vizualizarTodosLabs = async (request, response) => {
    const labs = await userModel.vizualizarTodosLabs()
    return response.status(200).json(labs)
};

const inativarLab = async (request, response) => {
    const infos = request.body;
    const inativando = await userModel.inativarLab(infos);
    return response.status(200).json({message: "Inativado com sucesso!", inativando});
}

const ativarLab = async (request, response) => {
    const infos = request.body;
    const ativando = await userModel.ativarLab(infos);
    return response.status(200).json({message: "Ativado com sucesso!", ativando});
}

module.exports = {
    buscarUsuario,
    cadastrarUsuario,
    inativarUsuario,
    buscarInfosUsuario,
    atualizarDocumento,
    atualizarEmail,
    atualizarSenha,
    atualizarTelefone,  
    atualizarNome,
    ativarUser,
    criarLaboratorio,
    vizualizarLab,
    vizualizarTodosLabs,
    inativarLab,
    ativarLab,
};

