require("dotenv").config();
import { Schema, model, connect } from "mongoose";

connect(process.env.MONGODB_URI as string)
  .then(() => console.log("conntected to db"))
  .catch((err) => console.log(err));

const contactSchema = new Schema({
  name: String,
  number: String,
});

contactSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Contact = model("Contact", contactSchema);
export default Contact;
