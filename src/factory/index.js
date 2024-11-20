const crypto = require('crypto');

// Private methods
// Generates 4 digit passcode
function generateAppPasscode() 
{
    const d1 = crypto.randomInt(1,10);
    const d2 = crypto.randomInt(1,10);
    const d3 = crypto.randomInt(1,10);
    const d4 = crypto.randomInt(1,10);
    const passcode = `${d1}${d2}${d3}${d4}`;
    return passcode;
}

// Main logic for generating variable size, base64url string
function generateRandomString(size)
{
    const bufferBytes = crypto.randomBytes(size);
    const secretKey = bufferBytes.toString('base64url');
    return secretKey;
}

// Generates single hash object
const generateHashObject = (size) => ({
    salt: generateRandomString(size),
    pepper: generateRandomString(size)
});

// Generates single encrypt object
const generateEncryptObject = (size) => ({
    prefix: generateRandomString(size),
    suffix: generateRandomString(size),
    vector: generateRandomString(12)
});

// Public methods
const generateAppKeys = () => ({
    APP_PASSCODE: generateAppPasscode()
})

// Generates session key of 32 characters from 24 bytes 
const generateSessionKey = () => generateRandomString(24);

const generateHashKeys = () => ({
    loginPassword: generateHashObject(9),
    defaultPasscode: generateHashObject(6),
    privatePasscode: generateHashObject(7)
});

const generateEncryptKeys = () => ({
    accountName: generateEncryptObject(6),
    username: generateEncryptObject(14),
    password: generateEncryptObject(14)
});

module.exports = {
    generateAppKeys,
    generateSessionKey,
    generateHashKeys,
    generateEncryptKeys
}