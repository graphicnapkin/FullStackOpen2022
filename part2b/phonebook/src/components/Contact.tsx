import React from "react";
import { ContactType } from "../types";
import { deleteContact, getContacts } from "./api";

const Contact = ({ person, persons, setPersons }: ContactProps) => {
  const handleDelete = () => {
    const confirm = window.confirm(`Delete ${person.name}?`);
    try {
      if (confirm) deleteContact(person.id);
    } catch(err) {
    setPersons(persons.filter((contact) => contact.id !== person.id),person,"notfound");
    }
    setPersons(persons.filter((contact) => contact.id !== person.id),person,"deleted");
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
  setPersons: (persons: ContactType[], person: ContactType, kind: string) => void;
}

export default Contact;
