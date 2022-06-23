"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.unknownEndpoint = exports.requestLogger = void 0;
var logger_1 = require("./logger");
var requestLogger = function (request, response, next) {
    (0, logger_1.info)('Method:', request.method);
    (0, logger_1.info)('Path:  ', request.path);
    (0, logger_1.info)('Body:  ', request.body);
    (0, logger_1.info)('---');
    next();
};
exports.requestLogger = requestLogger;
var unknownEndpoint = function (request, response) {
    response.status(404).send({ error: 'unknown endpoint' });
};
exports.unknownEndpoint = unknownEndpoint;
var errorHandler = function (error, request, response, next) {
    (0, logger_1.logError)(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    next(error);
};
exports.errorHandler = errorHandler;
