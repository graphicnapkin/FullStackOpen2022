import React from "react";
import { ContactType } from "../types";
import { deleteContact, getContacts } from "./api";

const Contact = ({ person, persons, setPersons }: ContactProps) => {
  const handleDelete = () => {
    const confirm = window.confirm(`Delete ${person.name}?`);
    if (confirm) deleteContact(person.id);
    setPersons(persons.filter((contact) => contact.id !== person.id));
  };

  return (
    <div>
      {person.name} {person.number}{" "}
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};

interface ContactProps {
  person: ContactType;
  persons: ContactType[];
  setPersons: (persons: ContactType[]) => void;
}

export default Contact;
