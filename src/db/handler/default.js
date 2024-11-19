const {getLogger} = require('../../logger');

// Commonly used responses
const dbResponseObject = (isExecutionSuccessful, data) => ({isExecutionSuccessful, data});
const defaultErrorResponse = () => dbResponseObject(false, null);
const dbSuccessResponse = (data = null) => dbResponseObject(true, data);

// Error Handler, Catch Block
const defaultDbErrorHandler = (error, filename, method) => {
    const logger = getLogger(filename, method);
    const {message, name, stack} = error;
    logger.error(`DB Execution Error: ${message}`, {name, stack});
    return defaultErrorResponse();
}

module.exports = {
    dbSuccessResponse,
    defaultDbErrorHandler
}