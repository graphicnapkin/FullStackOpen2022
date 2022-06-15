"use strict";
exports.__esModule = true;
var express = require("express");
var morgan = require("morgan");
var cors = require("cors");
//create app
var app = express();
app.use(express.json());
//set /build directory for static files
app.use(express.static("build"));
//setup logging
app.use(morgan(":method :url :body"));
morgan.token("body", function (req, _) {
    // @ts-ignore Doesn't think body is in req type
    return JSON.stringify(req.body);
});
//use cors
app.use(cors());
var basePeople_1 = require("./basePeople");
//make copy so that we can edit imported variable
var contacts = basePeople_1["default"];
//get all
app.get("/api/people", function (_, res) { return res.send(contacts); });
//get by id
app.get("/api/people/:id", function (_a, res) {
    var id = _a.params.id;
    var person = contacts.find(function (person) { return person.id === parseInt(id); });
    person ? res.json(person) : res.status(404).end();
});
//add from body
app.post("/api/people/", function (_a, res) {
    var body = _a.body;
    if (!body || !body.name || !body.number) {
        return res.status(400).json({
            error: "content missing"
        });
    }
    if (contacts.find(function (person) { return body.name === person.name; })) {
        return res.status(400).json({ error: "name must be unique" });
    }
    var maxId = Math.random() * 1000;
    var person = body;
    person.id = maxId + 1;
    contacts.push(person);
    res.json(person);
});
//delete by id
app["delete"]("/api/people/:id", function (_a, res) {
    var id = _a.params.id;
    contacts = contacts.filter(function (person) { return person.id !== parseInt(id); });
    res.status(204).end();
});
//get info
app.get("/info", function (req, res) {
    return res.send("Phonebook has info for " + contacts.length + " people\n        " + new Date().toLocaleString());
});
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () { return console.log("Server runnong on port " + PORT); });
