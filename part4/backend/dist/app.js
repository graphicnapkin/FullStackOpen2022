"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("./utils/config"));
var express = require('express');
var app = express();
var blog_1 = __importDefault(require("./controllers/blog"));
var middleware_1 = require("./utils/middleware");
var logger_1 = require("./utils/logger");
var mongoose = require('mongoose');
mongoose
    .connect(config_1.default.MONGODB_URI)
    .then(function () { return (0, logger_1.info)('Connected to DB'); })
    .catch(function (err) { return (0, logger_1.logError)('error connecting to DB:', err); });
var cors = require('cors');
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware_1.requestLogger);
app.use('/api/blog', blog_1.default);
app.use(middleware_1.unknownEndpoint);
app.use(middleware_1.errorHandler);
exports.default = app;
