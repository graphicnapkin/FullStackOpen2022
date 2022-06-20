"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var PORT = process.env.PORT || 3001;
var MONGODB_URI = process.env.MONGODB_URI || '';
exports.default = {
    MONGODB_URI: MONGODB_URI,
    PORT: PORT,
};
