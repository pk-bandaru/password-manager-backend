// DB Handler: Authentication
const sql = require('mssql');
const QUERIES = require('../queries/auth');
const {getLogger} = require('../../logger');

// Commonly used responses
const dbResponseObject = (isExecutionSuccessful, data=null) => ({isExecutionSuccessful, data});
const defaultErrorResponse = () => dbResponseObject(false);
const dbSuccessResponse = () => dbResponseObject(true);
const dbSuccessResponseWithRecordset = (data) => dbResponseObject(true, data);

// Error Handler, Catch Block
const defaultDbErrorHandler = (error, method) => {
    const logger = getLogger(__filename, method);
    const {message, name, stack} = error;
    logger.error(`DB Execution Error: ${message}`, {name, stack});
    return defaultErrorResponse();
}

// Get user ID based on input username
module.exports.getUserId = async (db, username) => {
    try{
        const dbResponse = await db.request()
                                    .input('username', sql.VarChar(16), username)
                                    .query(QUERIES.GET_USER_ID);

        return dbSuccessResponseWithRecordset(dbResponse.recordset);
    }
    catch(error){
        return defaultDbErrorHandler(error, 'getUserId');
    }
}

module.exports.getLoginPassword = async (db, userId) => {
    try{
        const dbResponse = await db.request()
                                    .input('userId', sql.Int, userId)
                                    .query(QUERIES.GET_LOGIN_PASSWORD);
                                    
        return dbSuccessResponseWithRecordset(dbResponse.recordset);
    }
    catch(error){
        return defaultDbErrorHandler(error, 'getLoginPassword');
    }
}

module.exports.insertNewUserRecord = async (db, user) => {
    try{
        const dbResponse = await db.request()
                                    .input('firstname', sql.VarChar(32), user.firstname)
                                    .input('lastname', sql.VarChar(16), user.lastname)
                                    .input('username', sql.VarChar(16), user.username)
                                    .input('password', sql.VarChar(128), user.password)
                                    .input('passcode', sql.VarChar(64), user.passcode)
                                    .input('hint', sql.VarChar(100), user.hint)
                                    .query(QUERIES.INSERT_NEW_USER_RECORD);
        return dbSuccessResponse();
    }
    catch(error){
        return defaultDbErrorHandler(error, 'insertNewUserRecord');
    }
}