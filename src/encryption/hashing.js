const crypto = require('crypto');
const STANDARDS = require('./standards');
const hashKeys = require('../../keys/hash.json');

const hashifyCredential = (credential, algorithm, secretKeys) => {
    const {salt, pepper} = secretKeys;
    const hashedCredentials = crypto.hash(algorithm, `${salt}${credential}${pepper}`, 'hex');
    return hashedCredentials;
}

const hashifyLoginPassword = password => hashifyCredential(
    password,
    STANDARDS.SHA_512,
    hashKeys.loginPassword
);

const hashifyDefaultPasscode = defaultPasscode => hashifyCredential(
    defaultPasscode,
    STANDARDS.SHA_256,
    hashKeys.defaultPasscode
);

const hashhifyPrivatePasscode = privatePasscode => hashifyCredential(
    privatePasscode,
    STANDARDS.SHA_256,
    hashKeys.privatePasscode
);

const verifyLoginPassword = (loginPassword, authenticLoginPassword) => 
    hashifyLoginPassword(loginPassword) === authenticLoginPassword;

const verifyDefaultPasscode = (defaultPasscode, authenticDefaultPasscode) =>
    hashifyDefaultPasscode(defaultPasscode) === authenticDefaultPasscode;

const verifyPrivatePasscode = (privatePasscode, authenticPrivatePasscode) => 
    hashhifyPrivatePasscode(privatePasscode) === authenticPrivatePasscode

module.exports = {
    hashifyLoginPassword,
    hashifyDefaultPasscode,
    hashhifyPrivatePasscode,
    verifyLoginPassword,
    verifyDefaultPasscode,
    verifyPrivatePasscode
}