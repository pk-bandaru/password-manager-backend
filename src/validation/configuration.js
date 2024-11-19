// Common validation function
function validate(value, defaultValue, validValueList=null)
{
    if (value === undefined){
        return defaultValue;
    }
    const returnValue = value.toLowerCase();
    if (validValueList !== null){
        return validValueList.includes(returnValue) ? returnValue : defaultValue
    }
    return returnValue;
}

// Validates and initializes with default value if invalid
function validateEnvironmentVariables()
{
    // Acceptable inputs for Environment variables
    const logLevels = ['error','warn','info','http','verbose','debug','silly'];
    const environments = ['dev', 'test', 'production'];
    const booleans = ['true','false'];

    // Destructure Environment variables
    const {ENVIRONMENT, SERVER_PORT, LOG_LEVEL, TRUST_SERVER_CERTIFICATE, ENCRYPT} = process.env;

    // Actual Validation
    process.env.ENVIRONMENT = validate(ENVIRONMENT, 'dev', environments);
    process.env.LOG_LEVEL = validate(LOG_LEVEL, 'info', logLevels);

    const serverPort = validate(SERVER_PORT, 3002);
    process.env.SERVER_PORT = isNaN(serverPort) ? 3002 : serverPort;

    process.env.TRUST_SERVER_CERTIFICATE = validate(TRUST_SERVER_CERTIFICATE, 'false', booleans);
    process.env.ENCRYPT = validate(ENCRYPT, 'true', booleans);
}

// Validate Individual DB Variable
function validateDbVariable(value)
{
    if(value === undefined || value === null || value === ''){
        return false;
    }
    return true;
}

// Validation for DB variables
function validateDatabaseVariables()
{
    const {DB_SERVER, DATABASE, LOGIN_ID, PASSWORD, INSTANCE, DB_PORT} = process.env;
    const dbVariables = {DB_SERVER, DATABASE, LOGIN_ID, PASSWORD, INSTANCE, DB_PORT};
    let invalidVariables = [];

    for(let variable in dbVariables){

        if(!validateDbVariable(dbVariables[variable])){
            invalidVariables.push(variable);
        }
    }
    // DB Port should be a valid number
    if(isNaN(DB_PORT)){
        invalidVariables.push('DB_PORT');
    }
    return invalidVariables;
}

module.exports = {
    validateEnvironmentVariables,
    validateDatabaseVariables
}