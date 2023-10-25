const jwt = require("jsonwebtoken");
const util = require("util");
const { _sendResponse } = require("../helpers");
const STATUS_CODES = require("../enums/statusCode");
const returnMessage = require("../enums/returnMessage");

const _verifyUserToken = (req, res, next) => {
    const response = {
        status: STATUS_CODES.FORBIDDEN,
        message: returnMessage.NOT_AUTHORIZED
    }
    const token = req.headers.authorization.splite(" ")[1];
    const jwtVerifyUsingPromises = util.promisify(jwt.verify);
    jwtVerifyUsingPromises(token, process.env.JWT_SECRET_KEY)
        .then(data => next(data))
        .catch(err => response.message = { "error": err })
        .finally(() => _sendResponse(response, res));
}

module.exports = {
    _verifyUserToken
}