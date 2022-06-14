import React, { useEffect, useState } from "react";
import { ContactType } from "./types";
import { getContacts } from "./components/api";

import Filter from "./components/Search";
import PersonForm from "./components/Form";
import Contacts from "./components/Numbers";
import Notificaiton from "./components/Message";

const App = () => {
  const [persons, setPersons] = useState<ContactType[]>([
    { name: "", number: "", id: NaN },
  ]);
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({ msg: "", kind: "" });

  const handleSetPersons = (
    persons: ContactType[],
    person: ContactType,
    kind: string
  ) => {
    setPersons(persons);
    person && kind && displayNotification(person, kind, setNotification)
  }
  
  useEffect(() => {
    const currentContacts = getContacts().then((contacts) =>
      setPersons(contacts)
    );
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notificaiton msg={notification.msg} kind={notification.kind} />
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm persons={persons} setPersons={handleSetPersons} />
      <Contacts
        persons={persons}
        setPersons={handleSetPersons}
        filter={filter}
      />
    </div>
  );
};

const displayNotification = (person: ContactType, kind: string, setNotification: React.Dispatch<React.SetStateAction<{msg: string, kind: string}>>) => {

    if (person && kind) {
      if (kind === "notfound") {
        setNotification({
          msg: `${person.name} has already been removed from server`,
          kind,
        });
      } else {
        setNotification({ msg: `${person.name} was ${kind}`, kind });
      }
    }
    setTimeout(() => setNotification({ msg: "", kind: "" }), 5000);
  };



export default App;
