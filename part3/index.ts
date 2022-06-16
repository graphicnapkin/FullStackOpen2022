import express = require("express");
import morgan = require("morgan");
import cors = require("cors");
import Contact from "./models/contacts";
import contactsList from "./basePeople";
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

//make copy so that we can edit imported variable
let contacts = contactsList;
//get all
app.get("/api/people", (_, res) =>
  Contact.find({}).then((results) => res.json(results))
);

//get by id
app.get("/api/people/:id", ({ params: { id } }, res) => {
  const person = contacts.find((person) => person.id === parseInt(id));
  person ? res.json(person) : res.status(404).end();
});

//add from body
app.post("/api/people/", ({ body }, res) => {
  if (!body || !body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }
  if (contacts.find((person) => body.name === person.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }
  const maxId = Math.random() * 1000;
  const person = body;
  person.id = maxId + 1;
  contacts.push(person);
  res.json(person);
});

//delete by id
app.delete("/api/people/:id", ({ params: { id } }, res) => {
  contacts = contacts.filter((person) => person.id !== parseInt(id));
  res.status(204).end();
});

//get info
app.get("/info", (_, res) =>
  res.send(`Phonebook has info for ${contacts.length} people
        ${new Date().toLocaleString()}`)
);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server runnong on port ${PORT}`));
