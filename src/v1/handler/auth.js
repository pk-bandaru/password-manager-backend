//V1 Authentication Handler
const dbo = require('../../db/handler/auth');
const algo = require('../../encryption/hashing');
const {getAuthToken, verifyAuthToken} = require('../../token');
const {validateNewUserData, validateLoginCredentials} = require('../../validation/user');

// Default Error Response
const sendServerResponse = (response, statusCode, data) => {
    response.status(statusCode);
    response.send(data);
}

const errorResponse = (response, errorMessage) => sendServerResponse(response, 400, {message: errorMessage});
const internalServerErrorResponse = (response) => sendServerResponse(response, 500, 'Internal Server Error');

// POST API: /register Validation
module.exports.validateRegistration = async (request, response, next) => {
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
    next();
}

// POST API: /register
module.exports.registerNewUser = async (request, response) => {
    const user = request.body;
    const {db} = request.app.locals;

    user.password = algo.hashifyLoginPassword(user.password);
    user.passcode = algo.hashifyDefaultPasscode(user.passcode);

    const insertResponse = await dbo.insertNewUserRecord(db, user);

    if(!insertResponse.isExecutionSuccessful){
        return internalServerErrorResponse(response);
    }
    sendServerResponse(response, 201, {message: 'User Registration Successful'});
}

module.exports.validateLogin = async (request, response, next) => {
    const credentials = request.body;
    const credsReport = validateLoginCredentials(credentials);

    if(!credsReport.isValid){
        return errorResponse(response, credsReport.message);
    }

    const {db} = request.app.locals;
    let dbResponse = await dbo.getUserId(db, credentials.username);

    if(!dbResponse.isExecutionSuccessful){
        return internalServerErrorResponse(response);
    }

    if(dbResponse.data.length === 0){
        return errorResponse(response, 'Invalid Username');
    }

    const {userId} = dbResponse.data[0];
    request.body.userId = userId;
    next();
}

module.exports.userLogin = async (request, response) => {
    const {userId, password} = request.body;
    const {db} = request.app.locals;

    const dbResponse = await dbo.getLoginPassword(db, userId);

    if(!dbResponse.isExecutionSuccessful){
        return internalServerErrorResponse(response);
    }

    const {hashedPassword} = dbResponse.data[0];
    const isValidPassword = algo.verifyLoginPassword(password, hashedPassword);

    if(!isValidPassword){
        return errorResponse(response, 'Incorrect Password');
    }

    const jwtToken = getAuthToken(userId);
    const responseData = {
        message: 'Login Successful',
        jwtToken
    };
    sendServerResponse(response, 200, responseData);
}