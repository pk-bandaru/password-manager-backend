// Encryption Standards
const ALGORITHMS = {
    PASSWORD_HASH_ALGO: 'sha3-512',
    PASSCODE_HASH_ALGO: 'sha3-256',
    USERNAME_ENCRYPTION: 'aes-256-gcm',
    PASSWORD_ENCRYPTION: 'aes-256-gcm'
};

// console.log(crypto.getHashes());
// console.log(crypto.getCiphers());

module.exports = ALGORITHMS;