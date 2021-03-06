"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var blog_1 = __importDefault(require("../models/blog"));
var user_1 = __importDefault(require("../models/user"));
var blogRouter = require('express').Router();
blogRouter.get('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var blogs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!request.body.token)
                    return [2 /*return*/, response.status(401).json({ error: 'token missing or invalid' })];
                return [4 /*yield*/, blog_1.default.find({}).populate('user', { username: 1, name: 1 })];
            case 1:
                blogs = _a.sent();
                response.json(blogs);
                return [2 /*return*/];
        }
    });
}); });
blogRouter.get('/:id', function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var blog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!request.body.token)
                    return [2 /*return*/, response.status(401).json({ error: 'token missing or invalid' })];
                return [4 /*yield*/, blog_1.default.findById(request.params.id)];
            case 1:
                blog = _a.sent();
                if (blog) {
                    response.json(blog);
                }
                else {
                    response.status(404).end();
                }
                return [2 /*return*/];
        }
    });
}); });
blogRouter.post('/', function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body, user, blog, savedBlog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = request.body;
                if (!body.token)
                    return [2 /*return*/, response.status(401).json({ error: 'token missing or invalid' })];
                return [4 /*yield*/, user_1.default.findById(body.user)];
            case 1:
                user = _a.sent();
                if (!body.likes)
                    body.likes = 0;
                blog = new blog_1.default(body);
                return [4 /*yield*/, blog.save()];
            case 2:
                savedBlog = _a.sent();
                user.blogs = user.blogs.concat(savedBlog._id);
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                response.status(201).json(savedBlog);
                return [2 /*return*/];
        }
    });
}); });
blogRouter.put('/:id', function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, author, url, likes, blog, updatedBlog;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!request.body.token)
                    return [2 /*return*/, response.status(401).json({ error: 'token missing or invalid' })];
                _a = request.body, title = _a.title, author = _a.author, url = _a.url, likes = _a.likes;
                blog = {
                    title: title,
                    author: author,
                    url: url,
                    likes: likes,
                };
                return [4 /*yield*/, blog_1.default.findByIdAndUpdate(request.params.id, blog, {
                        new: true,
                    })];
            case 1:
                updatedBlog = _b.sent();
                response.json(updatedBlog);
                return [2 /*return*/];
        }
    });
}); });
blogRouter.delete('/:id', function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var blog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!request.body.token)
                    return [2 /*return*/, response.status(401).json({ error: 'token missing or invalid' })];
                return [4 /*yield*/, blog_1.default.findById(request.params.id)];
            case 1:
                blog = _a.sent();
                if (request.body.user !== blog.user._id.toString()) {
                    return [2 /*return*/, response
                            .status(401)
                            .json({ error: 'user not authorized to delete this blog' })];
                }
                return [4 /*yield*/, blog_1.default.findByIdAndDelete(request.params.id)];
            case 2:
                _a.sent();
                response.status(204).end();
                return [2 /*return*/];
        }
    });
}); });
exports.default = blogRouter;
