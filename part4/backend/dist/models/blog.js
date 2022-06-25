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
blogSchema.set('toJSON', {
    transform: function (_, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
//const BlogModel: Model<{
//title: string
// author: string
// url: string | undefined
// likes: number | undefined
//}>
var BlogModel = mongoose.model('Blog', blogSchema);
//module.exports = { BlogModel, default: BlogModel }
exports.default = BlogModel;
