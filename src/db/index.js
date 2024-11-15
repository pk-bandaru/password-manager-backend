const sql = require('mssql');
const config = require('./config');
const {getLogger} = require('../logger');
const {validateDatabaseVariables} = require('../validation/configuration');

function getDbConnection()
{
    const logger = getLogger(__filename, 'getDbConnection');

    // Validates all the DB variables and return list of invalid variables
    const invalidDbVariables = validateDatabaseVariables();

    if(invalidDbVariables.length > 0){
        const message = `Following Database Variables are not configured properly: [${invalidDbVariables}]`;
        logger.error(message);
        throw new Error(message);
    }

    const connection = new sql.ConnectionPool(config);
    return connection;
}

module.exports = getDbConnection;


