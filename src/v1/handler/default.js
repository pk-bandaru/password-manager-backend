
// Default Error Response
const sendServerResponse = (response, statusCode, data) => {
    response.status(statusCode);
    response.send(data);
}

const internalServerErrorResponse = (response) => 
    sendServerResponse(response, 500, {message: 'Internal Server Error'});

module.exports = {
    sendServerResponse,
    internalServerErrorResponse
}