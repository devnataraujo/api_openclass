const connection = require('./connection');

//funcao para buscar usuarios
const buscarUsuarios = async () => { //criando uma funcao assincrona
    const [users] = await connection.execute('SELECT * FROM user_data'); // executando a query e armazenando o primeiro array do retorno
    return users; // retornando os objetos para o controller
};

const cadastrarUsuario = async (infos) => {
    const { cpf_cnpj, email, user_password, user_name, phone, flag_active, fk_user_type } = infos; //desestruturando o objeto infos
    const query = 'INSERT INTO user_data (cpf_cnpj, email, user_password, user_name, phone, flag_active, fk_user_type) VALUES (?, ?, ?, ?, ?, ?, ?)'; //criando a query
    const values = [cpf_cnpj, email, user_password, user_name, phone, flag_active, fk_user_type]; //criando o array de valores
    const [cadastrando] = await connection.execute(query, values); //executando a query e armazenando o primeiro array do retorno
    const id_user = cadastrando.insertId; //pegando o id do usuário cadastrado

    return id_user; //retornando o id do usuário cadastrado
};

const deletarUsuario = async(id) => {
    const [deletando] = await connection.execute('DELETE FROM user_data WHERE id_user = ?', [id]); //executando a query e armazenando o primeiro array do retorno
    return deletando; //retornando o id do usuário deletado
};

/*
const inativarUsuario = async(id) => {
    const [inativando] = await connection.execute('UPDATE user_data SET flag_active = 0 WHERE id_user = ?', [id]); //executando a query e armazenando o primeiro array do retorno
    return inativando; //retornando o id do usuário deletado
};
*/

const atualizarInfos = async(id, infos) => {
    const { email, phone } = infos; //desestruturando o objeto infos
    const query = 'UPDATE user_data SET email = ?, phone = ? WHERE id_user = ?'; //criando a query
    const atualizando = await connection.execute(query, [email, phone, id]); //executando a query e armazenando o primeiro array do retorno

    return atualizando; //retornando o id do usuário deletado
};

module.exports = {
    buscarUsuarios,
    cadastrarUsuario,
    deletarUsuario,
    //inativarUsuario,
    atualizarInfos,
}; //exportando funcoes para serem usadas em outros arquivos


