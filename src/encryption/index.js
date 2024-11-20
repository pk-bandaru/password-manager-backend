const crypto = require('crypto');
const STANDARDS = require('./standards');
const {APP_PASSCODE} = require('../../keys/app.json');
const encryptKeys = require('../../keys/encrypt.json');

// Generates Secret Key and Initialization Vector
function getSecretKeyAndIv(secretKeys, passcode)
{
    const {prefix, suffix, vector} = secretKeys;
    
    const prefixBuffer = Buffer.from(prefix, 'base64url');
    const suffixBuffer = Buffer.from(suffix, 'base64url');
    const vectorBuffer = Buffer.from(vector, 'base64url');
    const passcodeBuffer = Buffer.from(passcode);

    const key = Buffer.concat([prefixBuffer, passcodeBuffer, suffixBuffer]);
    const iv = Buffer.concat([vectorBuffer, passcodeBuffer]);

    return {key, iv};
}

// Encryption Logic
function encryptData(data, algorithm, secretKeys, passcode)
{
    const {key, iv} = getSecretKeyAndIv(secretKeys, passcode);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encryptedHexCode = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');
    return authTag +'.'+ encryptedHexCode;
}

// Decryption Logic
function decryptData(encryptedString, algorithm, secretKeys, passcode)
{
    const {key, iv} = getSecretKeyAndIv(secretKeys, passcode);

    const encryptedArray = encryptedString.split('.');
    const authTag = encryptedArray[0];
    const encryptedHexCode = encryptedArray[1];

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));

    const decrypted = decipher.update(encryptedHexCode, 'hex', 'utf8') + decipher.final('utf8');
    return decrypted;
}

// Encryption Constructors
const encryptAccountName = (accountName) => encryptData(
    accountName,
    STANDARDS.AES_128,
    encryptKeys.accountName,
    APP_PASSCODE
);

const encryptUsername = (username, passcode) => encryptData(
    username,
    STANDARDS.AES_256,
    encryptKeys.username,
    passcode
);

const encryptPassword = (password, passcode) => encryptData(
    password,
    STANDARDS.AES_256,
    encryptKeys.password,
    passcode
);

// Decryption Constructors
const decryptAccountName = (encryptedString) => decryptData(
    encryptedString,
    STANDARDS.AES_128,
    encryptKeys.accountName,
    APP_PASSCODE
);

const decryptUsername = (username, passcode) => decryptData(
    username,
    STANDARDS.AES_256,
    encryptKeys.username,
    passcode
);

const decryptPassword = (encryptedString, passcode) => decryptData(
    encryptedString,
    STANDARDS.AES_256,
    encryptKeys.password,
    passcode
);

module.exports = {
    encryptAccountName,
    encryptUsername,
    encryptPassword,
    decryptAccountName,
    decryptUsername,
    decryptPassword
}
