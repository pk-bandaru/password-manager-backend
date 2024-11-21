// V1 Generic Handler
const dbo = require('../../db/handler/generic');
const {sendServerResponse, internalServerErrorResponse} = require('./default');

module.exports.getCategories = async (request, response) => {
    const {db} = request.app.locals;
    const {isExecutionSuccessful, data} = await dbo.getCategories(db);

    if(!isExecutionSuccessful){
        return internalServerErrorResponse(response);
    }
    sendServerResponse(response, 200, data);
}

module.exports.getPasswordTypes = async (request, response) => {
    const {db} = request.app.locals;
    const {isExecutionSuccessful, data} = await dbo.getPasswordTypes(db);

    if(!isExecutionSuccessful){
        return internalServerErrorResponse(response);
    }
    sendServerResponse(response, 200, data);
}