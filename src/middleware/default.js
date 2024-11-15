// Default handler for handing invalid requests
function defaultRequestHandler(request, response)
{
    response.status(404);
    response.send("Bad Request");
}

module.exports = defaultRequestHandler