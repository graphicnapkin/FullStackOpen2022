"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
exports.requestLogger = function (request, response, next) {
    logger_1.info('Method:', request.method);
    logger_1.info('Path:  ', request.path);
    logger_1.info('Body:  ', request.body);
    logger_1.info('---');
    next();
};
exports.unknownEndpoint = function (request, response) {
    response.status(404).send({ error: 'unknown endpoint' });
};
exports.errorHandler = function (error, request, response, next) {
    logger_1.logError(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    next(error);
};
