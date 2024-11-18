const crypto = require('crypto');
const ALGORITHMS = require('./constants');
const hashKeys = require('../../keys/hash.json');

const hashifyCredential = (credential, algorithm, secretKeys) => {
    const {salt, pepper} = secretKeys;
    const hashedCredentials = crypto.hash(algorithm, `${salt}${credential}${pepper}`, 'hex');
    return hashedCredentials;
}

const hashifyLoginPassword = password => hashifyCredential(
    password,
    ALGORITHMS.PASSWORD_HASH_ALGO,
    hashKeys.loginPassword
);

const hashifyDefaultPasscode = defaultPasscode => hashifyCredential(
    defaultPasscode,
    ALGORITHMS.PASSCODE_HASH_ALGO,
    hashKeys.defaultPasscode
);

const hashhifyPrivatePasscode = privatePasscode => hashifyCredential(
    privatePasscode,
    ALGORITHMS.PASSCODE_HASH_ALGO,
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