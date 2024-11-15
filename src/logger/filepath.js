const path = require('path');

//Returns given number as 2 digit string
const format = (number) => number < 10 ? `0${number}` : number.toString();

function configureLogFilePath()
{
    const {ENVIRONMENT, LOG_LEVEL} = process.env;
    
    const currentDatetime = new Date();
    const year = currentDatetime.getFullYear().toString();
    const month = format(currentDatetime.getMonth()+1);
    const date = format(currentDatetime.getDate());

    const hours = format(currentDatetime.getHours());
    const minutes = format(currentDatetime.getMinutes());
    const seconds = format(currentDatetime.getSeconds());

    const datetime = `${year}-${month}-${date}_${hours}-${minutes}-${seconds}`;
    const filename = (ENVIRONMENT === 'dev') ? 'Server_Logs.log' : `Server_Logs_${datetime}.log`;
    
    process.env.LOG_FILENAME = path.join(
        process.cwd(),
        'logs',
        ENVIRONMENT,
        LOG_LEVEL==='debug' ? LOG_LEVEL : '',
        filename
    );
}

module.exports = configureLogFilePath;