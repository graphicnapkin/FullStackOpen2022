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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});
blogSchema.set('toJSON', {
    transform: function (_, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
var BlogModel = mongoose.model('Blog', blogSchema);
exports.default = BlogModel;
