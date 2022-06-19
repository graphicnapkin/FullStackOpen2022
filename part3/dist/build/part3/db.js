"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var contacts_1 = __importDefault(require("./models/contacts"));
//import mongoose from "mongoose";
if (process.argv.length < 3) {
    console.log("Missing arguments. Usage: node mongo.js <password> <nameToAdd> <numberToAdd>");
    process.exit(1);
}
var _a = process.argv.slice(2), password = _a[0], newName = _a[1], newNumber = _a[2];
var uri = "mongodb+srv://fullStackOpenUser:".concat(password, "@fullstackopen-cluster.chfhbsf.mongodb.net/?retryWrites=true&w=majority");
mongoose
    .connect(uri)
    .then(function () {
    console.log("connected");
    if (!newName) {
        console.log("phonebook:");
        contacts_1.default.find({}).then(function (result) {
            result.forEach(function (contact) {
                return console.log("".concat(contact.name, " ").concat(contact.number));
            });
            return mongoose.connection.close();
        });
    }
    else {
        var contact = new contacts_1.default({ name: newName, number: newNumber });
        return contact.save();
    }
})
    .then(function () {
    if (newName) {
        console.log("contact saved!");
        return mongoose.connection.close();
    }
})
    .catch(function (err) { return console.log(err); });
