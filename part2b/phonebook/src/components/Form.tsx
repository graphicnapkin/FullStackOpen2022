import React, { useState } from "react";
import { ContactType } from "../types";
import { makeContact, updateContact } from "./api";

const Form = ({ persons, setPersons }: FormProps) => {
  const [newContact, setNewContact] = useState<ContactType>({} as ContactType);
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const existingContact = persons.find(
      (person) => person.name === newContact.name
    );
    if (existingContact) {
      const confirm = window.confirm(
        `${newContact.name} is already added to the phonebook, replace the old number with a new one?`
      );
      if (confirm) {
        const updatedRecord = { ...existingContact, number: newContact.number };
        updateContact(updatedRecord.id, updatedRecord);
        setPersons(
          persons.map((person) =>
            person.name !== updatedRecord.name ? person : updatedRecord
          ),
          updatedRecord,
          "updated"
        );
      }
      return;
    }
    const response = makeContact(newContact);
    response.then((data) => setPersons([...persons, data], data, "added"));
  };

  return (
    <div>
      <h1>add a new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input
            onChange={(e) =>
              setNewContact({
                ...newContact,
                name: e.target.value,
              })
            }
            value={newContact.name || ""}
          />
          <br />
          number:{" "}
          <input
            onChange={(e) =>
              setNewContact({
                ...newContact,
                number: e.target.value,
              })
            }
            value={newContact.number || ""}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <div>debug: {newContact.name}</div>
      </form>
    </div>
  );
};

interface FormProps {
  persons: ContactType[];
  setPersons: (
    persons: ContactType[],
    person?: ContactType,
    kind?: string
  ) => void;
}
export default Form;
