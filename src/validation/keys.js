const fs = require('fs');
const path = require('path');
const factory = require('../factory');
const {getLogger} = require('../logger');

// Validates if data is exactly same as pre-defined length
function validateDataIntegrity(filepath, dataLength)
{
    const logger = getLogger(__filename, 'validateDataIntegrity');
    try{
        const data = fs.readFileSync(filepath);
        const isDataValid = data.length === dataLength;

        if(!isDataValid){
            logger.error('Data Integrity Breached', {filepath});
        }
        return isDataValid;
    }
    catch(error){
        const {message, name, stack} = error;
        logger.error(`Unable to read file: ${message}`, {name, stack, filepath});
        return false;
    }
}

// Checks if file exists, and if not, generates new file
function validateJsonFile(filepath, dataLength, generateRequiredKeys)
{
    try{
        const isFileExists = fs.existsSync(filepath);

        if(isFileExists){
            return validateDataIntegrity(filepath, dataLength);
        }

        const dataObject = generateRequiredKeys();
        const jsonString = JSON.stringify(dataObject, null, 4);
        fs.writeFileSync(filepath, jsonString);
        return true;
    }
    catch(error){
        const logger = getLogger(__filename, 'validateJsonFile');
        const {message, name, stack} = error;
        logger.error(`Failed to generate file or unable to write data: ${message}`, {name, stack, filepath});
        return false;
    }
}

// Checks if keys directory exists, if not, creates directory
function validateKeysDirectory(keysDirectory)
{
    try{
        const isKeysDirExists = fs.existsSync(keysDirectory);

        if (!isKeysDirExists){
            fs.mkdirSync(keysDirectory);
        }
        return true;
    }
    catch(error){
        const logger = getLogger(__filename, 'validateKeysDirectory');
        const {message, name, stack} = error;
        logger.error(`Failed to create Keys directory: ${message}`, {name, stack, keysDirectory});
        return false;
    }
}

// Validates all the secret key files exists or not. Throws error to terminate execution
function validateSecretKeys()
{
    const keysDirectory = path.join(__dirname,'..','..','keys');
    const appJsonFile = path.join(keysDirectory, 'app.json');
    const hashJsonFile = path.join(keysDirectory, 'hash.json');
    const encryptJsonFile = path.join(keysDirectory, 'encrypt.json');
    let isValidationSuccess = false;
    const isDirectoryExists = validateKeysDirectory(keysDirectory);

    if(isDirectoryExists){
        const isAppJsonValid = validateJsonFile(appJsonFile, 30, factory.generateAppKeys);
        const isHashJsonValid = validateJsonFile(hashJsonFile, 279, factory.generateHashKeys);
        const isEncryptJsonValid = validateJsonFile(encryptJsonFile, 415, factory.generateEncryptKeys);
        isValidationSuccess = isAppJsonValid && isHashJsonValid && isEncryptJsonValid;
    }
    
    if(!isValidationSuccess){
        throw new Error('Failed to validate Secret Keys, Please check the logs');
    }
}

// Generates a unique 32 character key and stores in environment variable
function initializeSessionKey()
{
    const sessionKey = factory.generateSessionKey();
    process.env.SESSION_KEY = sessionKey;
}

module.exports = {
    validateSecretKeys,
    initializeSessionKey
};