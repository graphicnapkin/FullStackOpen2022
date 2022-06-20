"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var blog_1 = __importDefault(require("../models/blog"));
var blogRouter = require('express').Router();
blogRouter.get('/', function (_, response) {
    blog_1.default.find({}).then(function (blogs) {
        response.json(blogs);
    });
});
blogRouter.get('/:id', function (request, response, next) {
    blog_1.default.findById(request.params.id)
        .then(function (blog) {
        if (blog) {
            response.json(blog);
        }
        else {
            response.status(404).end();
        }
    })
        .catch(function (err) { return next(err); });
});
blogRouter.post('/', function (request, response) {
    var blog = new blog_1.default(request.body);
    blog.save().then(function (result) {
        response.status(201).json(result);
    });
});
blogRouter.put('/:id', function (request, response, next) {
    var body = request.body;
    var blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    };
    blog_1.default.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(function (updatedBlog) { return response.json(updatedBlog); })
        .catch(function (err) { return next(err); });
});
blogRouter.delete('/:id', function (request, response, next) {
    blog_1.default.findByIdAndDelete(request.params.id)
        .then(function () { return response.status(204).end(); })
        .catch(function (err) { return next(err); });
});
exports.default = blogRouter;
