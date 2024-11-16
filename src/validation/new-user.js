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

function validateNewUserData(user)
{
    const fieldNames = ["firstname", "lastname", "username", "password", "passcode", "hint"];
    const maxLengths = [32, 16, 16, 16, 4, 100];

    for (let i=0; i<fieldNames.length; i++){
        const response = validateField(fieldNames[i], user[fieldNames[i]], maxLengths[i], i==4)
        if (!response.isValid){
            return response;
        }
    }
    return {isValid: true};
}

module.exports = validateNewUserData;