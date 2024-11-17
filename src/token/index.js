const jwt = require('jsonwebtoken');
const {getLogger} = require('../logger');
const {JWT_SECRET_KEY} = require('../../keys/token.json');

const getAuthToken = (userId) => {
    const payload = { userId };
    const options = { expiresIn: 5 * 60 }; // 5 Minutes
    const token = jwt.sign(payload, JWT_SECRET_KEY, options);
    return token;
}

const verifyAuthToken = (token) => {
    try{
        const payload = jwt.verify(token, JWT_SECRET_KEY);
        return payload.userId;
    }
    catch(error){
        const logger = getLogger(__filename, 'verifyAuthToken');
        const {name, message, stack, expiredAt} = error;
        const tokenExpiredAt = message === 'TokenExpiredError' ? expiredAt.toString() : 'N/A';
        logger.error(`JWT Token verify error: ${message}`, {name, stack, tokenExpiredAt});
        return null;
    }
}

module.exports = {
    getAuthToken,
    verifyAuthToken
}
