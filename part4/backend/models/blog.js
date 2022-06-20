"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var blogSchema = new mongoose_1["default"].Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});
exports["default"] = mongoose_1["default"].model('Blog', blogSchema);
