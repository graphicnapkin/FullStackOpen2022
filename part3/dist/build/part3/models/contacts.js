"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var mongoose_1 = require("mongoose");
(0, mongoose_1.connect)(process.env.MONGODB_URI)
    .then(function () { return console.log("conntected to db"); })
    .catch(function (err) { return console.log(err); });
var contactSchema = new mongoose_1.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
        unique: true,
    },
    number: {
        type: String,
        required: false,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: function (props) {
                return "".concat(props.value, " is not a valid phone number!");
            },
        },
    },
});
contactSchema.set("toJSON", {
    transform: function (_, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
var Contact = (0, mongoose_1.model)("Contact", contactSchema);
exports.default = Contact;
