const {getLogger} = require('../logger');

function getLoggerMiddleware()
{
    const logger = getLogger(__filename);

    // Custom Middleware Function for logging API requests
    const loggerMiddleware = (request, response, next) => {
        logger.http(`${request.method} Request for URL: ${request.url}`);
        next();
    }
    return loggerMiddleware;
}

module.exports = getLoggerMiddleware;