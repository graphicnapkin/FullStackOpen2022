"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
    },
    author: {
        type: String,
        required: true,
        minlength: 1,
    },
    url: {
        type: String,
        minlength: 4,
    },
    likes: Number,
});
var BlogModel = mongoose.model('Blog', blogSchema);
exports.default = BlogModel;
