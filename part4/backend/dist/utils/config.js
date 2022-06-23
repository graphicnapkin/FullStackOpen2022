"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var PORT = process.env.PORT || 3001;
var MONGODB_URI = process.env.MONGODB_URI;
if (process.env.NODE_ENV === 'test')
    MONGODB_URI = process.env.TEST_MONGODB_URI || '';
if (process.env.NODE_ENV === 'development')
    MONGODB_URI = process.env.DEV_MONGODB_URI || '';
exports.default = {
    MONGODB_URI: MONGODB_URI,
    PORT: PORT,
};
