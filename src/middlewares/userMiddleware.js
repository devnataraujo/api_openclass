const validateBody = (request, response, next) => {
    const {body} = request;

    //validando o body
    if(body.cpf_cnpj == '' || body.cpf_cnpj == undefined || body.cpf_cnpj == null || body.cpf_cnpj.length < 11 || body.cpf_cnpj.length > 14){
        return response.status(400).json({message: "O campo cpf_cnpj é obrigatório!"})
    ;}

    next();
};

const validateFieldEmail = (request, response, next) => {
    const {body} = request;

    //validando o body
    if(body.email == '' || body.email == undefined || body.email == null){
        return response.status(400).json({message: "O campo email é obrigatório!"})
    ;}

    next();

};

module.exports = {
    validateBody,
    validateFieldEmail,
};

//deletar usuario 15