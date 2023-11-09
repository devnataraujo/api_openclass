const connection = require('./connection');

//funcao para buscar usuarios
const buscarUsuario = async (info) => { //criando uma funcao assincrona
    const { email, user_password } = info; //desestruturando o objeto info
    const [usuario] = await connection.execute('select user_name, fk_user_type, flag_active FROM user_data WHERE email = ? and user_password = SHA2(?, 224);', [email, user_password]); //executando a query e armazenando o primeiro array do retorno
    return usuario; //retornando o usuario
};

const cadastrarUsuario = async (infos) => {
    const { cpf_cnpj, email, user_password, user_name, phone, flag_active, fk_user_type } = infos; //desestruturando o objeto infos
    const query = 'INSERT INTO user_data (cpf_cnpj, email, user_password, user_name, phone, flag_active, fk_user_type) VALUES (?, ?, SHA2(?, 224), ?, ?, ?, ?)'; //criando a query
    const values = [cpf_cnpj, email, user_password, user_name, phone, flag_active, fk_user_type]; //criando o array de valores
    const [cadastrando] = await connection.execute(query, values); //executando a query e armazenando o primeiro array do retorno
    const id_user = cadastrando.insertId; //pegando o id do usuário cadastrado

    return id_user; //retornando o id do usuário cadastrado
};


const inativarUsuario = async(id) => {
    const [inativando] = await connection.execute('UPDATE user_data SET flag_active = 0 WHERE id_user = ?', [id]); //executando a query e armazenando o primeiro array do retorno
    return inativando; //retornando o id do usuário deletado
};


const buscarInfosUsuario = async(id) => {
    const [usuario] = await connection.execute('select * FROM user_data WHERE id_user = ?;', [id]); //executando a query e armazenando o primeiro array do retorno
    return usuario; //retornando o usuario
};


// infos para atualizar
//  user_name , phone  
const atualizarDocumento = async (infos) => {
    const {id_user, cpf_cnpj} = infos; //desestruturando o objeto infos
    const query = 'UPDATE user_data SET cpf_cnpj = ? WHERE id_user = ?'; //criando a query
    const values = [cpf_cnpj, id_user]; //criando o array de valores
    const [atualizando] = await connection.execute(query, values); //executando a query e armazenando o primeiro array do retorno
    return atualizando; //retornando o id do usuário cadastrado
}


const atualizarEmail = async (infos) => {
    const {id_user, email} = infos; //desestruturando o objeto infos
    const query = 'UPDATE user_data SET email = ? WHERE id_user = ?'; //criando a query
    const values = [email, id_user]; //criando o array de valores
    const [atualizando] = await connection.execute(query, values); //executando a query e armazenando o primeiro array do retorno
    return atualizando; //retornando o id do usuário cadastrado
}

const atualizarSenha = async (infos) => {
    const {id_user, user_password} = infos; //desestruturando o objeto infos
    const query = 'UPDATE user_data SET user_password = SHA2(?, 224) WHERE id_user = ?'; //criando a query
    const values = [user_password, id_user]; //criando o array de valores
    const [atualizando] = await connection.execute(query, values); //executando a query e armazenando o primeiro array do retorno
    return atualizando; //retornando o id do usuário cadastrado
}

const atualizarTelefone = async (infos) => {
    const {id_user, phone} = infos; //desestruturando o objeto infos
    const query = 'UPDATE user_data SET phone = ? WHERE id_user = ?'; //criando a query
    const values = [phone, id_user]; //criando o array de valores
    const [atualizando] = await connection.execute(query, values); //executando a query e armazenando o primeiro array do retorno
    return atualizando; //retornando o id do usuário cadastrado
}

const atualizarNome =  async (infos) => {
    const {id_user, user_name} = infos; //desestruturando o objeto infos
    const query = 'UPDATE user_data SET user_name = ? WHERE id_user = ?'; //criando a query
    const values = [user_name, id_user]; //criando o array de valores
    const [atualizando] = await connection.execute(query, values); //executando a query e armazenando o primeiro array do retorno
    return atualizando; //retornando o id do usuário cadastrado
}

const ativarUser = async (infos) => {
    // variaveis
    const {id_user, id_inativar} = infos; //desestruturando o objeto infos
    const queryVerificarADM = 'SELECT fk_user_type FROM user_data WHERE id_user = ?'; //criando a query
    const valuesVerificarADM = [id_user]; //criando o array de valores
    const [verificando] = await connection.execute(queryVerificarADM, valuesVerificarADM); //executando a query e armazenando o primeiro array do retorno

    // verificar se quem está ativando é administrador
    if(verificando[0].fk_user_type != 1){
        return response.status(401).json({message: "Usuário não tem permissão para ativar usuário!"})
    }else{
        // verificar se o usuário está inativo
        const queryVerificarInativo = 'SELECT flag_active FROM user_data WHERE id_user = ?'; //criando a query
        const valuesVerificarInativo = [id_inativar]; //criando o array de valores
        const [verificandoInativo] = await connection.execute(queryVerificarInativo, valuesVerificarInativo); //executando a query e armazenando o primeiro array do retorno
        if(verificandoInativo[0].flag_active != 0){
            return response.status(401).json({message: "Usuário já está ativo!"})
        }else{
            // ativar o usuário
            const query = 'UPDATE user_data SET flag_active = 1 WHERE id_user = ?'; //criando a query
            const values = [id_inativar]; //criando o array de valores
            const [ativando] = await connection.execute(query, values); //executando a query e armazenando o primeiro array do retorno
            return ativando; //retornando o id do usuário cadastrado
        }
    }
}


// id_lab, lab, floor, lab_description, flag_active, fk_responsavel int
// criando laboratorio
const criarLaboratorio = async (infos) => {
    const {lab, floor, lab_description, flag_active, fk_responsavel} = infos; //desestruturando o objeto infos
    const query = 'INSERT INTO lab (lab, floor, lab_description, flag_active, fk_responsavel) VALUES (?, ?, ?, ?, ?)'; //criando a query
    const values = [lab, floor, lab_description, flag_active, fk_responsavel]; //criando o array de valores
    const [criando] = await connection.execute(query, values); //executando a query e armazenando o primeiro array do retorno
    const id_lab = criando.insertId; //pegando o id do usuário cadastrado
    return id_lab; //retornando o id do usuário cadastrado
}

const vizualizarLab = async (id) => {
    const [lab] = await connection.execute('select * FROM lab WHERE id_lab = ?;', [id]); //executando a query e armazenando o primeiro array do retorno
    return lab; //retornando o usuario
}

const vizualizarTodosLabs = async () => {
    const [lab] = await connection.execute('select * FROM lab;'); //executando a query e armazenando o primeiro array do retorno
    return lab; //retornando o usuario
}

const inativarLab = async (infos) => {
    // verificar se quem está inativando é quem criou o laboratorio
    const {id_user, id_inativar} = infos; //desestruturando o objeto infos
    const queryVerificarADM = 'SELECT fk_responsavel FROM lab WHERE id_lab = ?'; //criando a query
    const valuesVerificarADM = [id_inativar]; //criando o array de valores
    const [verificando] = await connection.execute(queryVerificarADM, valuesVerificarADM); //executando a query e armazenando o primeiro array do retorno
    if(verificando[0].fk_responsavel != id_user){
        return response.status(401).json({message: "Usuário não tem permissão para inativar laboratório!"})
    }else{
        const [inativando] = await connection.execute('UPDATE lab SET flag_active = 0 WHERE id_lab = ?', [id_inativar]); //executando a query e armazenando o primeiro array do retorno
        return inativando; //retornando o id do usuário deletado
    }

};

const ativarLab = async (infos) => {
    const {id_user, id_inativar} = infos; //desestruturando o objeto infos
    const queryVerificarADM = 'SELECT fk_responsavel FROM lab WHERE id_lab = ?'; //criando a query
    const valuesVerificarADM = [id_inativar]; //criando o array de valores
    const [verificando] = await connection.execute(queryVerificarADM, valuesVerificarADM); //executando a query e armazenando o primeiro array do retorno
    if(verificando[0].fk_responsavel != id_user){
        return response.status(401).json({message: "Usuário não tem permissão para ativar laboratório!"})
    }else{
        const queryVerificarInativo = 'SELECT flag_active FROM lab WHERE id_lab = ?'; //criando a query
        const valuesVerificarInativo = [id_inativar]; //criando o array de valores
        const [verificandoInativo] = await connection.execute(queryVerificarInativo, valuesVerificarInativo); //executando a query e armazenando o primeiro array do retorno
        if(verificandoInativo[0].flag_active != 0){
            return response.status(401).json({message: "Laboratório já está ativo!"})
        }else{
            // ativar o laboratorio
            const query = 'UPDATE lab SET flag_active = 1 WHERE id_lab = ?'; //criando a query
            const values = [id_inativar]; //criando o array de valores
            const [ativando] = await connection.execute(query, values); //executando a query e armazenando o primeiro array do retorno
            return ativando; //retornando o id do usuário cadastrado
        }
    }
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
}; //exportando funcoes para serem usadas em outros arquivos


