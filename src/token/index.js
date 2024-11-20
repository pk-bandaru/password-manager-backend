const jwt = require('jsonwebtoken');
const {getLogger} = require('../logger');

const getAuthToken = (userId) => {
    const JWT_SECRET_KEY = process.env.SESSION_KEY;
    const payload = { userId };
    const options = { expiresIn: 5 * 60 }; // 5 Minutes
    const token = jwt.sign(payload, JWT_SECRET_KEY, options);
    return token;
}

const verifyAuthToken = (token) => {
    try{
        const JWT_SECRET_KEY = process.env.SESSION_KEY;
        const payload = jwt.verify(token, JWT_SECRET_KEY);
        return payload.userId;
    }
    catch(error){
        const logger = getLogger(__filename, 'verifyAuthToken');
        const {name, message, stack, expiredAt} = error;

        const isTokenExpiredError = (name === 'TokenExpiredError');
        const response = isTokenExpiredError ? 0 : null;
        const tokenExpiredAt = isTokenExpiredError ? expiredAt.toString() : 'N/A';

        logger.error(`JWT Token verify error: ${message}`, {name, stack, tokenExpiredAt});
        return response;
    }
}

module.exports = {
    getAuthToken,
    verifyAuthToken
}
