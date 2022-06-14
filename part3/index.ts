import express from "express";
const app = express();
app.use(express.json());

const contactList: { persons: Contact[] } = {
  persons: [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1,
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2,
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3,
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4,
    },
  ],
};

interface Contact {
  name: string;
  number: string;
  id: number;
}

//get all
app.get("/api/people", (_, res) => res.send(contactList));

//get by id
app.get("/api/people/:id", ({ params: { id } }, res) => {
  const person = contactList.persons.find(
    (person) => person.id === parseInt(id)
  );
  person ? res.json(person) : res.status(404).end();
});

//add from body
app.post("/api/people/", ({ body }, res) => {
  if (!body || !body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }
  if (contactList.persons.find((person) => body.name === person.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }
  const maxId = Math.random() * 100000;
  const person = body as Contact;
  person.id = maxId + 1;
  contactList.persons.push(person);
  res.json(person);
});

//delete by id
app.delete("/api/people/:id", ({ params: { id } }, res) => {
  contactList.persons = contactList.persons.filter(
    (person) => person.id !== parseInt(id)
  );
  res.status(204).end();
});

//get info
app.get("/info", (req, res) =>
  res.send(`Phonebook has info for ${contactList.persons.length} people
        ${new Date().toLocaleString()}`)
);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server runnong on port ${PORT}`));
