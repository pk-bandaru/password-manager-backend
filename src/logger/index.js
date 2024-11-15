const winston = require('winston');
const configureLogFilePath = require('./filepath');
const CUSTOM_LOGGER = 'passwordManagerLogger';

function createLogger()
{
    configureLogFilePath();
    const {LOG_FILENAME} = process.env;
    const {combine, errors, timestamp, json, prettyPrint, printf} = winston.format;

    winston.loggers.add(CUSTOM_LOGGER, {
        level: process.env.LOG_LEVEL || 'info',
        format: combine(
            errors({stack: true}),
            timestamp({format:'YYYY-MM-DD HH:mm:ss.SSS, UTCZ'}),
            json(),
            prettyPrint()
        ),
        transports: [
            new winston.transports.File({filename:LOG_FILENAME}),
            new winston.transports.Console({
                format: combine(
                    printf(log => `\n${log.level.toUpperCase()}: ${log.message} \nTIME: ${log.timestamp}`)
                )
            })
        ],
        exitOnError: false
    });
}

function getLogger(filename = null, method = null)
{
    const metaData = {};

    let module = null;
    if(filename !== null)
    {
        const srcIndex = filename.indexOf('src');
        module = filename.substring(srcIndex);
        metaData.module = module;
    }
    if(method !== null)
        {
        metaData.method = method
    }
    
    const logger = winston.loggers.get(CUSTOM_LOGGER);
    const childLogger = logger.child(metaData);
    
    return childLogger;
}

module.exports = {
    createLogger,
    getLogger
}