// DB Handler: Generic
const sql = require('mssql');
const QUERIES = require('../queries/generic');
const {dbSuccessResponse, defaultDbErrorHandler} = require('./default');

module.exports.getCategories = async (db) => {
    try{
        const dbResponse = await db.request().query(QUERIES.GET_CATEGORIES);
        return dbSuccessResponse(dbResponse.recordset);
    }
    catch(error){
        return defaultDbErrorHandler(error, __filename, 'getCategories');
    }
}

module.exports.getPasswordTypes = async (db) => {
    try{
        const dbResponse = await db.request().query(QUERIES.GET_PASSWORD_TYPES);
        return dbSuccessResponse(dbResponse.recordset);
    }
    catch(error){
        return defaultDbErrorHandler(error, __filename, 'getPasswordTypes');
    }
}