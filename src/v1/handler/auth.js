//V1 Authentication Handler
const dbo = require('../../db/handler/auth');
const algo = require('../../encryption/hashing');
const validateNewUserData = require('../../validation/new-user');

// Default Error Response
const sendServerResponse = (response, statusCode, message) => {
    response.status(statusCode);
    response.send(message);
}

const errorResponse = (response, errorMessage) => sendServerResponse(response, 400, errorMessage);
const successResponse = (response, successMessage) => sendServerResponse(response, 200, successMessage);
const internalServerErrorResponse = (response) => sendServerResponse(response, 500, 'Internal Server Error');

// POST API: /register
module.exports.registerNewUser = async (request, response) => {
    const user = request.body;
    const userReport = validateNewUserData(user);

    if(!userReport.isValid){
        return errorResponse(response, userReport.message);
    }

    const {db} = request.app.locals;
    const dbResponse = await dbo.getUserId(db, user.username);

    if(!dbResponse.isExecutionSuccessful){
        return internalServerErrorResponse(response);
    }

    if(dbResponse.data.length > 0){
        const errorMessage = `Username '${user.username}' Already Taken`;
        return errorResponse(response, errorMessage);
    }

    user.password = algo.hashifyLoginPassword(user.password);
    user.passcode = algo.hashifyDefaultPasscode(user.passcode);

    const insertResponse = await dbo.insertNewUserRecord(db, user);

    if(!insertResponse.isExecutionSuccessful){
        return internalServerErrorResponse(response);
    }
    sendServerResponse(response, 201, 'User Registration Successful');
}