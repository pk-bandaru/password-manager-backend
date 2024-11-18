// Default Response Object
const invalidResponse = (message) => ({isValid: false, message});

function validateField(feildName, fieldValue, maxLength, isPasscode=false)
{
    const minLength = 3;
    
    if(fieldValue === undefined || fieldValue === null || fieldValue === ''){
        return invalidResponse(`${feildName} cannot be empty`);
    }

    if(isPasscode){
        if(isNaN(fieldValue) || fieldValue.length !== maxLength){
            return invalidResponse(`${feildName} should be 4 digit numeric value`);
        }
    }
    else{
        if(fieldValue.length < minLength || fieldValue.length > maxLength){
            return invalidResponse(`${feildName} length should be within ${minLength} to ${maxLength} characters`);
        }
    }
    return {isValid: true};
}

function validateInputFields(fields, fieldNames, maxLengths)
{
    for (let i=0; i<fieldNames.length; i++)
    {
        const fieldName = fieldNames[i];
        const response = validateField(fieldName, fields[fieldName], maxLengths[i], fieldName==='passcode');

        if (!response.isValid){
            return response;
        }
    }
    return {isValid: true};
}

function validateNewUserData(user)
{
    const fieldNames = ["firstname", "lastname", "username", "password", "passcode", "hint"];
    const maxLengths = [32, 16, 16, 16, 4, 100];
    return validateInputFields(user, fieldNames, maxLengths);
}

function validateLoginCredentials(credentials)
{
    const fieldNames = ["username", "password"];
    const maxLengths = [16, 16];
    return validateInputFields(credentials, fieldNames, maxLengths);
}

function validatePasscode(passcode)
{
    const fieldName = 'passcode';
    const maxLength = 4;
    return validateInputFields(passcode, fieldName, maxLength);
}

module.exports = {
    validateNewUserData,
    validateLoginCredentials,
    validatePasscode
}