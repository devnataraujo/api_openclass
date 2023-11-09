const jwt = require('jsonwebtoken');

const validateBody = (request, response, next) => {
    const {body} = request;

    //validando o body
    if(body.cpf_cnpj == '' || body.cpf_cnpj == undefined || body.cpf_cnpj == null || body.cpf_cnpj.length < 11 || body.cpf_cnpj.length > 14){
        return response.status(400).json({message: "O campo cpf_cnpj é obrigatório!"})
    ;}

    next();
};


// Middleware para proteger rotas com JWT
const verifyJWT = (request, response, next) => {
    const token = request.headers.authorization;

    if(!token){
        return response.status(401).json({message: "Token não encontrado!"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        request.user = decoded;
        next();
    }
    catch(error){
        return response.status(401).json({message: "Token inválido!"});
    }

    
}



module.exports = {
    validateBody,
    verifyJWT,
};

//deletar usuario 15