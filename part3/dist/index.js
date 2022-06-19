"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var cors = require("cors");
var contacts_1 = __importDefault(require("./models/contacts"));
require("dotenv").config();
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
//get all
app.get("/api/people", function (_, res) {
  return contacts_1.default.find({}).then(function (results) {
    return res.json(results);
  });
});
//get by id
app.get("/api/people/:id", function (_a, res, next) {
  var id = _a.params.id;
  contacts_1.default
    .findById(id)
    .then(function (person) {
      return res.json(person);
    })
    .catch(function (err) {
      return next(err);
    });
});
//update user
app.put("/api/people/:id", function (req, res, next) {
  console.log("made it");
  var person = {
    name: req.body.name,
    number: req.body.number,
  };
  contacts_1.default
    .findByIdAndUpdate(req.params.id, person, {
      new: true,
      runValidators: true,
      context: "query",
    })
    .then(function (result) {
      return res.json(result);
    })
    .catch(function (err) {
      return next(err);
    });
});
//delete by id
app.delete("/api/people/:id", function (_a, res, next) {
  var id = _a.params.id;
  contacts_1.default
    .findByIdAndRemove(id)
    .then(function (result) {
      return res.status(204).end();
    })
    .catch(function (err) {
      return next(err);
    });
});
//add from body
app.post("/api/people/", function (_a, res, next) {
  var body = _a.body;
  if (!body || !body.name) {
    return res.status(400).json({
      error: "content missing",
    });
  }
  var person = new contacts_1.default({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then(function (savedContact) {
      return res.json(savedContact);
    })
    .catch(function (err) {
      return next(err);
    });
});
//get info
app.get("/info", function (_, res) {
  var contacts = contacts_1.default.find({}).then(function (results) {
    res.send(
      "Phonebook has info for "
        .concat(results.length, " people")
        .concat(new Date().toLocaleString())
    );
  });
});
var unknownEndpoint = function (req, response) {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);
var errorHandler = function (err, req, res, next) {
  console.error(err.message);
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  if (err.name === "ValidationError") {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
  next(err);
};
app.use(errorHandler);
var PORT = process.env.PORT;
app.listen(PORT, function () {
  return console.log("Server runnong on port ".concat(PORT));
});
