"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
//import { Model } from 'mongoose'
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
//const BlogModel: Model<{
//title: string
// author: string
// url: string | undefined
// likes: number | undefined
//}>
var BlogModel = mongoose.model('Blog', blogSchema);
exports.default = BlogModel;
