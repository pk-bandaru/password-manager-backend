// DB Handler: Authentication
const sql = require('mssql');
const QUERIES = require('../queries/auth');
const {dbSuccessResponse, defaultDbErrorHandler} = require('./default');

// Get user ID based on input username
module.exports.getUserId = async (db, username) => {
    try{
        const dbResponse = await db.request()
                                    .input('username', sql.VarChar(16), username)
                                    .query(QUERIES.GET_USER_ID);

        return dbSuccessResponse(dbResponse.recordset);
    }
    catch(error){
        return defaultDbErrorHandler(error, __filename, 'getUserId');
    }
}

module.exports.getLoginPassword = async (db, userId) => {
    try{
        const dbResponse = await db.request()
                                    .input('userId', sql.Int, userId)
                                    .query(QUERIES.GET_LOGIN_PASSWORD);
                                    
        return dbSuccessResponse(dbResponse.recordset);
    }
    catch(error){
        return defaultDbErrorHandler(error, __filename, 'getLoginPassword');
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
        return defaultDbErrorHandler(error, __filename, 'insertNewUserRecord');
    }
}