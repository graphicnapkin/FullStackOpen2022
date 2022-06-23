"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mostLikes = exports.mostBlogs = exports.favoriteBlog = exports.totalLikes = exports.dummy = void 0;
var dummy = function (blogs) {
    return 1;
};
exports.dummy = dummy;
var totalLikes = function (blogs) {
    var totalLikes = 0;
    blogs.forEach(function (blog) { return (totalLikes += blog.likes || 0); });
    return totalLikes;
};
exports.totalLikes = totalLikes;
var favoriteBlog = function (blogs) {
    var favorite = blogs[0];
    blogs.forEach(function (blog) {
        if (blog.likes > favorite.likes)
            favorite = blog;
    });
    return favorite;
};
exports.favoriteBlog = favoriteBlog;
var mostBlogs = function (blogs) {
    var bookCount = {};
    var top = { author: '', blogs: 0 };
    blogs.forEach(function (_a) {
        var author = _a.author;
        if (!bookCount[author])
            bookCount[author] = 0;
        bookCount[author]++;
        if (bookCount[author] > top.blogs)
            top = { author: author, blogs: bookCount[author] };
    });
    return top;
};
exports.mostBlogs = mostBlogs;
var mostLikes = function (blogs) {
    var likeCount = {};
    var top = { author: '', likes: 0 };
    blogs.forEach(function (_a) {
        var author = _a.author, likes = _a.likes;
        if (!likeCount[author])
            likeCount[author] = 0;
        likeCount[author] += likes;
        if (likeCount[author] > top.likes)
            top = { author: author, likes: likeCount[author] };
    });
    return top;
};
exports.mostLikes = mostLikes;
