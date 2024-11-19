// DB Handler: Account Specific
const sql = require('mssql');
const QUERIES = require('../queries/account');
const {dbSuccessResponse, defaultDbErrorHandler} = require('./default');

module.exports.getAccounts = async (db, userId) => {
    try{
        const dbResponse = await db.request()
                                    .input('userId', sql.Int, userId)
                                    .query(QUERIES.GET_ACCOUNTS);
                                    
        return dbSuccessResponse(dbResponse.recordset);
    }
    catch(error){
        return defaultDbErrorHandler(error, __filename, 'getAccounts')
    }
}