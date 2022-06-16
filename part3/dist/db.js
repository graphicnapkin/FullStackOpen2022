"use strict";
var mongoose = require("mongoose");
//import mongoose from "mongoose";
if (process.argv.length < 3) {
    console.log("Missing arguments. Usage: node mongo.js <password> <nameToAdd> <numberToAdd>");
    process.exit(1);
}
var _a = process.argv.slice(2), password = _a[0], newName = _a[1], newNumber = _a[2];
var uri = "mongodb+srv://fullStackOpenUser:" + password + "@fullstackopen-cluster.chfhbsf.mongodb.net/?retryWrites=true&w=majority";
var contactSchema = new mongoose.Schema({
    name: String,
    number: String,
});
var Contact = mongoose.model("Contact", contactSchema);
mongoose
    .connect(uri)
    .then(function () {
    console.log("connected");
    if (!newName) {
        console.log("phonebook:");
        Contact.find({}).then(function (result) {
            result.forEach(function (contact) {
                return console.log(contact.name + " " + contact.number);
            });
            return mongoose.connection.close();
        });
    }
    else {
        var contact = new Contact({ name: newName, number: newNumber });
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
