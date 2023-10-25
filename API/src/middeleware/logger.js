const fs = require('fs');

const logRequest = (req) => {
    const requestDate = new Date();
    const logMessage = `Request - Method: ${req.method}, URL: ${req.url}, requested at ${requestDate}\n`;
    fs.appendFileSync(process.env.LOGGER_FILE_NAME, logMessage);
};

const logResponse = (res) => {
    const responseDate = new Date();
    const logMessage = `Response - Status: ${res.statusCode} at ${responseDate} \n\n`;
    fs.appendFileSync(process.env.LOGGER_FILE_NAME, logMessage);
};

module.exports = { logRequest, logResponse };