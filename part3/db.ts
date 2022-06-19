const mongoose = require("mongoose");
import Contact from "./models/contacts";

//import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log(
    "Missing arguments. Usage: node mongo.js <password> <nameToAdd> <numberToAdd>"
  );
  process.exit(1);
}

const [password, newName, newNumber] = process.argv.slice(2);

const uri = `mongodb+srv://fullStackOpenUser:${password}@fullstackopen-cluster.chfhbsf.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() => {
    console.log("connected");
    if (!newName) {
      console.log("phonebook:");
      Contact.find({}).then((result) => {
        result.forEach((contact: { name: string; number: string }) =>
          console.log(`${contact.name} ${contact.number}`)
        );
        return mongoose.connection.close();
      });
    } else {
      const contact = new Contact({ name: newName, number: newNumber });
      return contact.save();
    }
  })
  .then(() => {
    if (newName) {
      console.log("contact saved!");
      return mongoose.connection.close();
    }
  })
  .catch((err: Error) => console.log(err));
