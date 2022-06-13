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
  const [notification, setNotificaiton] = useState({ msg: "", kind: "" });

  const handleSetPersons =(persons: ContactType[], person?: ContactType, kind?: string) => {
    setPersons(persons)
    if(person && kind) {
      setNotificaiton({msg: `${person.name} was ${kind}`, kind})
      console.log(notification)
    }
    setTimeout(()=> setNotificaiton({ msg: "", kind: "" }), 5000)
  }

  useEffect(() => {
    const currentContacts = getContacts().then((contacts) =>
      setPersons(contacts)
    );
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notificaiton msg={notification.msg} type={notification.kind} />
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm persons={persons} setPersons={handleSetPersons} />
      <Contacts persons={persons} setPersons={handleSetPersons} filter={filter} />
    </div>
  );
};

export default App;
