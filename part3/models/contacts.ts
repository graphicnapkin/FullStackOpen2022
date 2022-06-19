require("dotenv").config();
import { Schema, model, connect } from "mongoose";

connect(process.env.MONGODB_URI as string)
  .then(() => console.log("conntected to db"))
  .catch((err) => console.log(err));

const contactSchema = new Schema({
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
      validator: function (v: string) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid phone number!`,
    },
  },
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
