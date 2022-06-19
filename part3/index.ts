import express = require("express");
import { Request, Response, NextFunction } from "express";
import morgan = require("morgan");
import cors = require("cors");
import Contact from "./models/contacts";
require("dotenv").config();

//create app
const app = express();
app.use(express.json());
//set /build directory for static files
app.use(express.static("build"));

//setup logging
app.use(morgan(":method :url :body"));
morgan.token("body", (req, _) => {
  // @ts-ignore Doesn't think body is in req type
  return JSON.stringify(req.body);
});

//use cors
app.use(cors());

//get all
app.get("/api/people", (_, res) =>
  Contact.find({}).then((results) => res.json(results))
);

//get by id
app.get("/api/people/:id", ({ params: { id } }, res, next) => {
  Contact.findById(id)
    .then((person) => res.json(person))
    .catch((err) => next(err));
});

//update user
app.put("/api/people/:id", (req, res, next) => {
  console.log("made it");
  const person = {
    name: req.body.name,
    number: req.body.number,
  };
  Contact.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

//delete by id
app.delete("/api/people/:id", ({ params: { id } }, res, next) => {
  Contact.findByIdAndRemove(id)
    .then((result) => res.status(204).end())
    .catch((err) => next(err));
});

//add from body
app.post("/api/people/", ({ body }, res, next) => {
  if (!body || !body.name) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const person = new Contact({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedContact: {}) => res.json(savedContact))
    .catch((err: Error) => next(err));
});

//get info
app.get("/info", (_, res) => {
  const contacts = Contact.find({}).then((results) => {
    res.send(
      `Phonebook has info for ${
        results.length
      } people${new Date().toLocaleString()}`
    );
  });
});

const unknownEndpoint = (req: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server runnong on port ${PORT}`));
