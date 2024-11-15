// Get the reuired libraries
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

// Get the custom functionalities
const v1Router = require('./v1/router');
const v2Router = require('./v2/router');

const getDbConnection = require('./db');
const {createLogger, getLogger} = require('./logger');
const getLoggerMiddleware = require('./middleware/logger');
const defaultRequestHandler = require('./middleware/default');
const {validateEnvironmentVariables} = require('./validation/configuration');

function startApplication()
{
    validateEnvironmentVariables();
    
    // Configure and create App specific logger
    createLogger();

    // Invoke DB Connection
    const db = getDbConnection();

    // Initiate Server and Middlewares
    const app = express();

    app.use(bodyParser.json());
    app.use(helmet());
    app.use(cors());

    app.use(getLoggerMiddleware());
    app.use('/api/v1', v1Router);
    app.use('/api/v2', v2Router);
    app.use(defaultRequestHandler);

    // Server Start Callback Function
    const serverListenCallback = async (error) => {
        const logger = getLogger(__filename, 'startApplication');
        
        if(error){
            const {message, name, stack} = error;
            logger.error(`Failed to start server with error: ${message}`,{name, stack});
            server.close();
        }
        try{
            const pool = await db.connect();
            app.locals.db = pool;
            logger.info(`Server started successfully, and listening at http://localhost:${SERVER_PORT}`);
        }
        catch(err){
            const {message, name, stack} = err;
            logger.error(`Error Occurred: ${message}`,{name, stack});
            server.close();
        }
    }

    const {SERVER_PORT} = process.env;
    const server = app.listen(SERVER_PORT, serverListenCallback);
}

module.exports = startApplication;