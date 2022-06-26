"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        },
    ],
});
userSchema.set('toJSON', {
    //@ts-ignore
    transform: function (_, updatedDoc) {
        updatedDoc.id = updatedDoc._id.toString();
        delete updatedDoc._id;
        delete updatedDoc.__v;
        delete updatedDoc.passwordHash;
    },
});
var UserModel = mongoose.model('User', userSchema);
exports.default = UserModel;
