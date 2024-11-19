const dbo = require('../../db/handler/account');
const algo = require('../../encryption');
const {sendServerResponse, internalServerErrorResponse} = require('./default');

const getDecryptedAccountObject = (account) => 
    ({...account, accountName: algo.decryptAccountName(account.accountName)});

// GET API: /accounts Validation
module.exports.getAccounts = async (request, response) => {
    const {userId} = request;
    const {db} = request.app.locals;

    const {isExecutionSuccessful, data} = await dbo.getAccounts(db, userId);

    if(!isExecutionSuccessful){
        return internalServerErrorResponse(response);
    }

    try{
        const decryptedData = (data.length > 0) ? data.map(getDecryptedAccountObject) : data;
        sendServerResponse(response, 200, decryptedData);
    }
    catch(error){
        return internalServerErrorResponse(response);
    }
}
